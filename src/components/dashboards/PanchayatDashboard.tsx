// src/components/dashboards/PanchayatDashboard.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useState as _useState, ChangeEvent, FormEvent } from 'react'; // keep types available
import jsPDF from 'jspdf';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import {
  Home,
  Users,
  Calendar,
  FileText,
  BookOpen,
  MapPin,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  Search as SearchIcon,
  DownloadCloud,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

// Leaflet + React-Leaflet
import L from 'leaflet';
import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// --- Fix default icon paths for Vite bundler ---
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  // Use CDN URLs for Vite compatibility
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});
/* eslint-enable @typescript-eslint/ban-ts-comment */

// ---------------------- Types ----------------------
interface PanchayatDashboardProps {
  onNavigate: (page: string) => void;
}

type EventStatus = 'scheduled' | 'completed';
type ReportFormat = 'PDF' | 'Excel' | 'CSV';

interface EventReportData {
  format: ReportFormat;
  totalAttendees: number;
  studentsVerified: number;
  summary: string;
  photosCount?: number;
  photoNames?: string[];
  photoDataUrls?: string[];
}

interface EventItem {
  id: number;
  date: string;
  title: string;
  venue: string;
  attendees: number;
  status: EventStatus;
  description?: string;
  report?: EventReportData;
}

interface EventFormState {
  type: string;
  date: string;
  venue: string;
  expectedParticipants: string;
  description: string;
}

interface ReportFormState {
  totalAttendees: string;
  studentsVerified: string;
  summary: string;
  format: ReportFormat;
}

interface ReportPhoto {
  name: string;
  dataUrl: string;
}

interface VillageCoverage {
  village: string;
  enabled: number;
  pending: number;
  lat: number;
  lng: number;
  address: string;
  pincode: string;
  mapsUrl: string;
}

// ---------------------- FitBounds helper component ----------------------
function FitMapBounds({ points }: { points: { lat: number; lng: number }[] }) {
  const map = useMap();
  useEffect(() => {
    if (!points || points.length === 0) return;
    const latlngs = points.map((p) => [p.lat, p.lng] as [number, number]);
    try {
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [60, 60] });
    } catch (err) {
      // ignore
    }
  }, [map, points]);
  return null;
}

// ---------------------- Main Component ----------------------
export default function PanchayatDashboard({ onNavigate }: PanchayatDashboardProps) {
  const [currentTab, setCurrentTab] = useState<string>('home');

  // ---- core state (kept same as your original) ----
  const villageData = {
    name: 'Rampur Gram Panchayat',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    totalStudents: 156,
    enabled: 118,
    pending: 28,
    notEnabled: 10,
  };

  const studentsData = [
    { id: 'VP001', name: 'Arvind Kumar', village: 'Rampur', education: 'B.Sc 2nd Year', dbtStatus: 'enabled' },
    { id: 'VP002', name: 'Sunita Devi', village: 'Rampur', education: 'B.A 3rd Year', dbtStatus: 'enabled' },
    { id: 'VP003', name: 'Raju Yadav', village: 'Khajuriya', education: 'B.Com 1st Year', dbtStatus: 'pending' },
    { id: 'VP004', name: 'Meena Kumari', village: 'Rampur', education: 'B.Tech 4th Year', dbtStatus: 'enabled' },
  ];

  const initialEventsData: EventItem[] = [
    {
      id: 1,
      date: 'Dec 20, 2025',
      title: 'DBT Verification Camp',
      venue: 'Panchayat Bhawan',
      attendees: 85,
      status: 'scheduled',
    },
    {
      id: 2,
      date: 'Nov 15, 2025',
      title: 'Awareness Session',
      venue: 'Community Hall',
      attendees: 120,
      status: 'completed',
      report: {
        format: 'PDF',
        totalAttendees: 120,
        studentsVerified: 90,
        summary: 'Awareness session on DBT schemes and documentation.',
        photosCount: 3,
        photoNames: ['session1.jpg', 'session2.jpg', 'group_photo.jpg'],
        photoDataUrls: [],
      },
    },
    {
      id: 3,
      date: 'Oct 28, 2025',
      title: 'Document Collection Drive',
      venue: 'Village Square',
      attendees: 95,
      status: 'completed',
      report: {
        format: 'Excel',
        totalAttendees: 95,
        studentsVerified: 70,
        summary: 'Collected documents and verified student eligibility.',
        photosCount: 2,
        photoNames: ['docs_collection_1.jpg', 'docs_collection_2.jpg'],
        photoDataUrls: [],
      },
    },
  ];

  const [events, setEvents] = useState<EventItem[]>(initialEventsData);

  const [eventForm, setEventForm] = useState<EventFormState>({
    type: 'Verification Camp',
    date: '',
    venue: '',
    expectedParticipants: '',
    description: '',
  });

  const [selectedReportEventId, setSelectedReportEventId] = useState<number | ''>('');
  const [reportForm, setReportForm] = useState<ReportFormState>({
    totalAttendees: '',
    studentsVerified: '',
    summary: '',
    format: 'PDF',
  });

  const [reportPhotos, setReportPhotos] = useState<ReportPhoto[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [panchayatResources] = useState<any[]>([
    {
      name: 'Panchayat Officer Onboarding Guide',
      language: 'English',
      type: 'PDF',
      size: 'Onboarding Handbook',
      path: '/resources/panchayat-resources/Panchayat%20Officer%20Onboarding%20Guide.pdf',
    },
    {
      name: 'DBT Schemes – Overview for Panchayats',
      language: 'English',
      type: 'PDF',
      size: 'Schemes Compendium',
      path: '/resources/panchayat-resources/DBTschemes.pdf',
    },
    {
      name: 'About Direct Benefit Transfer',
      language: 'English',
      type: 'PDF',
      size: 'Concept Note',
      path: '/resources/panchayat-resources/About%20Direct%20Benefit%20Transfer.pdf',
    },
  ]);

  // --- full chartData (10 demo points across states) ---
  const fullChartData: VillageCoverage[] = useMemo(
    () => [
      {
        village: 'Rampur (Uttar Pradesh)',
        enabled: 68,
        pending: 12,
        lat: 25.37,
        lng: 82.98,
        address: 'Rampur Gram Panchayat, Varanasi, Uttar Pradesh - 221103',
        pincode: '221103',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=25.37,82.98',
      },
      {
        village: 'Panchkula (Haryana)',
        enabled: 54,
        pending: 20,
        lat: 30.6942,
        lng: 76.8606,
        address: 'Panchkula Village, Panchkula District, Haryana - 134109',
        pincode: '134109',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=30.6942,76.8606',
      },
      {
        village: 'Rajapur (Maharashtra)',
        enabled: 80,
        pending: 15,
        lat: 16.67,
        lng: 73.52,
        address: 'Rajapur Gram Panchayat, Ratnagiri, Maharashtra - 416702',
        pincode: '416702',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=16.67,73.52',
      },
      {
        village: 'Kottayam (Kerala)',
        enabled: 92,
        pending: 8,
        lat: 9.5916,
        lng: 76.5222,
        address: 'Kottayam Panchayat, Kottayam District, Kerala - 686001',
        pincode: '686001',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.5916,76.5222',
      },
      {
        village: 'Madurai North (Tamil Nadu)',
        enabled: 70,
        pending: 25,
        lat: 9.9391,
        lng: 78.1217,
        address: 'Madurai North Panchayat, Madurai, Tamil Nadu - 625001',
        pincode: '625001',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.9391,78.1217',
      },
      {
        village: 'Bishnupur (West Bengal)',
        enabled: 60,
        pending: 18,
        lat: 23.0722,
        lng: 87.3198,
        address: 'Bishnupur Panchayat, Bankura District, West Bengal - 722122',
        pincode: '722122',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=23.0722,87.3198',
      },
      {
        village: 'Srinagar (J&K)',
        enabled: 75,
        pending: 10,
        lat: 34.0837,
        lng: 74.7973,
        address: 'Srinagar Panchayat Ward, Srinagar District, Jammu & Kashmir - 190001',
        pincode: '190001',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.0837,74.7973',
      },
      {
        village: 'Dibrugarh (Assam)',
        enabled: 48,
        pending: 12,
        lat: 27.4728,
        lng: 94.911,
        address: 'Dibrugarh Panchayat, Dibrugarh District, Assam - 786001',
        pincode: '786001',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=27.4728,94.911',
      },
      {
        village: 'Udaipur (Rajasthan)',
        enabled: 85,
        pending: 6,
        lat: 24.5854,
        lng: 73.7125,
        address: 'Udaipur Gram Panchayat, Udaipur District, Rajasthan - 313001',
        pincode: '313001',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=24.5854,73.7125',
      },
      {
        village: 'Patna Rural (Bihar)',
        enabled: 58,
        pending: 22,
        lat: 25.5941,
        lng: 85.1376,
        address: 'Patna Rural Panchayat, Patna District, Bihar - 800001',
        pincode: '800001',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=25.5941,85.1376',
      },
    ],
    []
  );

  // derived (filter + search)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<VillageCoverage[]>(fullChartData);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setFilteredData(fullChartData);
      return;
    }
    const filtered = fullChartData.filter(
      (v) =>
        v.village.toLowerCase().includes(q) ||
        v.pincode.toLowerCase().includes(q) ||
        v.address.toLowerCase().includes(q)
    );
    setFilteredData(filtered);
  }, [searchQuery, fullChartData]);

  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);

  // handle event form changes
  const handleEventInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReportInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReportForm((prev) => ({ ...prev, [name]: value as any }));
  };

  // file helper
  const fileToDataUrl = (file: File): Promise<ReportPhoto> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve({
          name: file.name,
          dataUrl: reader.result as string,
        });
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    try {
      const photos = await Promise.all(filesArray.map(fileToDataUrl));
      setReportPhotos(photos);
    } catch (err) {
      console.error('Error reading files', err);
      alert('Unable to read some photos. Please try again.');
    }
  };

  const formatDisplayDate = (rawDate: string) => {
    if (!rawDate) return '';
    const d = new Date(rawDate);
    if (Number.isNaN(d.getTime())) return rawDate;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const downloadFile = (fileName: string, content: string, mimeType: string) => {
    if (typeof window === 'undefined') return;
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFormatMeta = (format: ReportFormat) => {
    const ext = format === 'PDF' ? 'pdf' : format === 'Excel' ? 'xlsx' : 'csv';
    const mime =
      format === 'PDF'
        ? 'application/pdf'
        : format === 'Excel'
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        : 'text/csv';
    return { ext, mime };
  };

  // PDF helper
  const downloadPdf = (fileName: string, lines: string[], images?: string[]) => {
    const doc = new jsPDF();
    const marginX = 15;
    const contentTop = 35;
    const lineHeight = 7;

    const drawHeader = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Gram Panchayat DBT Report', marginX, 15);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Government of India (Demo)', marginX, 22);

      // Tricolour bar
      doc.setLineWidth(1);
      doc.setDrawColor(255, 153, 51);
      doc.line(marginX, 26, pageWidth - marginX, 26);
      doc.setDrawColor(19, 136, 8);
      doc.line(marginX, 28, pageWidth - marginX, 28);
    };

    drawHeader();

    let y = contentTop;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    lines.forEach((line) => {
      const split = doc.splitTextToSize(line, pageWidth - marginX * 2);
      split.forEach((part) => {
        if (y > pageHeight - 20) {
          doc.addPage();
          drawHeader();
          y = contentTop;
        }
        doc.text(part, marginX, y);
        y += lineHeight;
      });
    });

    if (images && images.length > 0) {
      images.forEach((img, index) => {
        doc.addPage();
        drawHeader();
        const pageW = doc.internal.pageSize.getWidth();
        const margin = 15;
        const imgWidth = pageW - margin * 2;
        const imgHeight = imgWidth * 0.6;

        doc.setFontSize(12);
        doc.text(`Photo ${index + 1}`, margin, contentTop);

        try {
          doc.addImage(img, 'JPEG', margin, contentTop + 5, imgWidth, imgHeight);
        } catch {
          doc.text('Unable to render this photo in PDF preview.', margin, contentTop + 15);
        }
      });
    }

    // Footer pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();
      const footerText = `Page ${i} of ${pageCount}`;
      doc.setFontSize(9);
      const textWidth = doc.getTextWidth(footerText);
      doc.text(footerText, pw - marginX - textWidth, ph - 10);
    }

    doc.save(fileName);
  };

  // Static report download
  const handleDownloadStaticReport = (title: string, format: ReportFormat) => {
    const { ext, mime } = getFormatMeta(format);
    const fileName = `${title.replace(/\s+/g, '_')}.${ext}`;

    const lines = [
      `Report: ${title}`,
      `Format: ${format}`,
      '',
      `Panchayat: ${villageData.name}`,
      `District: ${villageData.district}`,
      `State: ${villageData.state}`,
      '',
      'This is a demo auto-generated report file for UI testing.',
    ];

    if (format === 'PDF') {
      downloadPdf(fileName, lines);
    } else {
      const content = lines.join('\n');
      downloadFile(fileName, content, mime);
    }
  };

  const handleDownloadEventReport = (event: EventItem) => {
    if (!event.report) return;
    const { format, totalAttendees, studentsVerified, summary, photosCount, photoNames, photoDataUrls } = event.report;
    const { ext, mime } = getFormatMeta(format);
    const fileName = `${event.title.replace(/\s+/g, '_')}_Report.${ext}`;

    const baseLines = [
      'DIRECT BENEFIT TRANSFER (DBT) EVENT REPORT',
      '------------------------------------------',
      '',
      `Panchayat Name : ${villageData.name}`,
      `District       : ${villageData.district}`,
      `State          : ${villageData.state}`,
      '',
      `Event Title    : ${event.title}`,
      `Event Date     : ${event.date}`,
      `Venue          : ${event.venue}`,
      '',
      `Total Attendees     : ${totalAttendees}`,
      `Students Verified   : ${studentsVerified}`,
      `Photos Attached     : ${photosCount ?? 0}`,
      '',
      'Activity Summary:',
      summary || 'No summary provided.',
    ];

    const photoLines = photoNames && photoNames.length > 0 ? ['', 'Photo Files:', ...photoNames.map((n, i) => `  ${i + 1}. ${n}`)] : [];
    const footerLines = ['', 'Generated from: Gram Panchayat Dashboard (Demo)'];
    const lines = [...baseLines, ...photoLines, ...footerLines];

    if (format === 'PDF') {
      downloadPdf(fileName, lines, photoDataUrls && photoDataUrls.length ? photoDataUrls : undefined);
    } else {
      const content = lines.join('\n');
      downloadFile(fileName, content, mime);
    }
  };

  const handleScheduleEvent = (e: FormEvent) => {
    e.preventDefault();
    if (!eventForm.date || !eventForm.venue || !eventForm.type) {
      alert('Please fill Date, Venue, and Event Type.');
      return;
    }
    const nextId = events.length > 0 ? Math.max(...events.map((ev) => ev.id)) + 1 : 1;
    const newEvent: EventItem = {
      id: nextId,
      date: formatDisplayDate(eventForm.date),
      title: eventForm.type,
      venue: eventForm.venue,
      attendees: eventForm.expectedParticipants ? parseInt(eventForm.expectedParticipants, 10) : 0,
      status: 'scheduled',
      description: eventForm.description,
    };
    setEvents((prev) => [newEvent, ...prev]);
    setEventForm({ type: 'Verification Camp', date: '', venue: '', expectedParticipants: '', description: '' });
  };

  const handleSubmitReport = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedReportEventId) {
      alert('Please select an event to upload report.');
      return;
    }
    if (!reportForm.totalAttendees || !reportForm.studentsVerified) {
      alert('Please fill Total Attendees and Students Verified.');
      return;
    }
    const totalAtt = parseInt(reportForm.totalAttendees, 10);
    const studentsVer = parseInt(reportForm.studentsVerified, 10);

    setEvents((prev) =>
      prev.map((event) =>
        event.id === selectedReportEventId
          ? {
              ...event,
              status: 'completed',
              attendees: totalAtt || event.attendees,
              report: {
                format: reportForm.format,
                totalAttendees: totalAtt,
                studentsVerified: studentsVer,
                summary: reportForm.summary || 'Event report submitted.',
                photosCount: reportPhotos.length,
                photoNames: reportPhotos.map((p) => p.name),
                photoDataUrls: reportPhotos.map((p) => p.dataUrl),
              },
            }
          : event
      )
    );

    setReportForm({ totalAttendees: '', studentsVerified: '', summary: '', format: 'PDF' });
    setSelectedReportEventId('');
    setReportPhotos([]);
    alert('Event report submitted, photos attached, and event marked as completed.');
  };

  const sidebar = (
    <nav className="py-4">
      {[
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'resources', label: 'Resources', icon: BookOpen },
        { id: 'map', label: 'Coverage Map', icon: MapPin },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
              currentTab === item.id ? 'bg-orange-50 text-[#FF9933] border-r-4 border-[#FF9933]' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  // --- CSV export for coverage points ---
  const exportCoverageCSV = (data: VillageCoverage[]) => {
    if (!data || data.length === 0) {
      alert('No coverage points to export.');
      return;
    }
    const header = ['village,address,pincode,lat,lng,enabled,pending,coverage_percent,mapsUrl'];
    const rows = data.map((d) => {
      const total = d.enabled + d.pending || 1;
      const coverage = Math.round((d.enabled / total) * 100);
      // escape commas in address by wrapping double-quotes and doubling inner quotes
      const safeAddress = `"${String(d.address).replace(/"/g, '""')}"`;
      return `${d.village},${safeAddress},${d.pincode},${d.lat},${d.lng},${d.enabled},${d.pending},${coverage},${d.mapsUrl}`;
    });
    const csv = [...header, ...rows].join('\n');
    downloadFile('coverage_points.csv', csv, 'text/csv');
  };

  // ---------------------- UI render ----------------------
  return (
    <DashboardLayout title="Gram Panchayat Dashboard" userRole="Panchayat Officer" userName={villageData.name} onNavigate={onNavigate} sidebar={sidebar}>
      {/* HOME */}
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] p-1 rounded">
              <div className="bg-white p-2 rounded">
                <MapPin className="w-8 h-8 text-[#002147]" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl text-[#002147]">{villageData.name}</h2>
              <p className="text-gray-600">
                {villageData.district}, {villageData.state}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-[#FF9933]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-3xl text-[#002147]">{villageData.totalStudents}</p>
                  </div>
                  <Users className="w-8 h-8 text-[#FF9933]" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#138808]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">DBT Enabled</p>
                    <p className="text-3xl text-[#138808]">{villageData.enabled}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-[#138808]" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-3xl text-yellow-600">{villageData.pending}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Not Enabled</p>
                    <p className="text-3xl text-red-600">{villageData.notEnabled}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-[#FF9933]">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-green-50">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#FF9933]" />
                DBT Enablement Progress
              </CardTitle>
              <CardDescription>
                {((villageData.enabled / villageData.totalStudents) * 100).toFixed(1)}% of students are DBT-enabled
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Target: 90%</span>
                    <span>
                      {villageData.enabled}/{villageData.totalStudents}
                    </span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FF9933] to-[#138808]" style={{ width: `${(villageData.enabled / villageData.totalStudents) * 100}%` }} />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded">
                    <div className="text-xl text-[#138808]">76%</div>
                    <div className="text-xs text-gray-600">Enabled</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded">
                    <div className="text-xl text-yellow-600">18%</div>
                    <div className="text-xs text-gray-600">Pending</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded">
                    <div className="text-xl text-red-600">6%</div>
                    <div className="text-xs text-gray-600">Not Enabled</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Village-wise DBT Status</CardTitle>
              <CardDescription>Distribution across villages in the panchayat</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="village" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="enabled" fill="#138808" name="Enabled" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Upcoming Events</span>
                <Button size="sm" className="bg[#FF9933] hover:bg[#e68a2e] bg-[#FF9933]" onClick={() => setCurrentTab('events')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Event
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events.filter((e) => e.status === 'scheduled').map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50 border-[#FF9933]">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-[#FF9933]" />
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-600">
                          {event.date} • {event.venue}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-[#FF9933] hover:bg-[#FF9933]">Scheduled</Badge>
                  </div>
                ))}
                {events.filter((e) => e.status === 'scheduled').length === 0 && <p className="text-sm text-gray-500">No upcoming events. Use "Schedule Event" to add a new one.</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* STUDENTS */}
      {currentTab === 'students' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Students in Jurisdiction</h2>
            <p className="text-gray-600">View and track students from villages under your panchayat</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
              <CardDescription>Students from {villageData.name} area</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Village</TableHead>
                    <TableHead>Education</TableHead>
                    <TableHead>DBT Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.village}</TableCell>
                      <TableCell>{student.education}</TableCell>
                      <TableCell>
                        {student.dbtStatus === 'enabled' && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Enabled
                          </Badge>
                        )}
                        {student.dbtStatus === 'pending' && (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredData.slice(0, 3).map((village, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#FF9933]" />
                    {village.village}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Enabled:</span>
                      <span className="font-medium text-[#138808]">{village.enabled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pending:</span>
                      <span className="font-medium text-yellow-600">{village.pending}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total:</span>
                      <span className="font-medium">{village.enabled + village.pending}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">{village.address}</div>
                    <div className="mt-1">
                      <a className="text-blue-600 underline text-xs" href={village.mapsUrl} target="_blank" rel="noreferrer">
                        Directions →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* EVENTS */}
      {currentTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-[#002147] mb-1">Event Management</h2>
              <p className="text-gray-600">Schedule and manage awareness camps and verification drives</p>
            </div>
            <Button className="bg-[#FF9933] hover:bg-[#e68a2e]" onClick={() => {
              const el = document.getElementById('event-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule New Event
            </Button>
          </div>

          <Card id="event-form">
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4" onSubmit={handleScheduleEvent}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Event Type</label>
                    <select name="type" className="w-full mt-1 p-2 border rounded" value={eventForm.type} onChange={handleEventInputChange}>
                      <option>Verification Camp</option>
                      <option>Awareness Session</option>
                      <option>Document Collection Drive</option>
                      <option>Training Program</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" name="date" className="mt-1" value={eventForm.date} onChange={handleEventInputChange} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Venue</label>
                  <Input name="venue" placeholder="e.g., Panchayat Bhawan, Rampur" className="mt-1" value={eventForm.venue} onChange={handleEventInputChange} />
                </div>

                <div>
                  <label className="text-sm font-medium">Expected Participants</label>
                  <Input type="number" name="expectedParticipants" placeholder="Estimated number of attendees" className="mt-1" value={eventForm.expectedParticipants} onChange={handleEventInputChange} />
                </div>

                <div>
                  <label className="text-sm font-medium">Event Description</label>
                  <textarea name="description" className="w-full mt-1 p-2 border rounded h-24" placeholder="Describe the event objectives and agenda..." value={eventForm.description} onChange={handleEventInputChange} />
                </div>

                <Button type="submit" className="w-full bg-[#138808] hover:bg-[#0f6906]">
                  Schedule Event
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className={`p-4 border rounded-lg ${event.status === 'scheduled' ? 'bg-orange-50 border-[#FF9933]' : 'bg-gray-50'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="text-sm text-gray-600 mt-1">
                          <div>📅 {event.date}</div>
                          <div>📍 {event.venue}</div>
                          <div>👥 {event.attendees} attendees</div>
                          {event.description && <div className="mt-1">📝 {event.description}</div>}
                          {event.report && (
                            <div className="mt-1 text-xs text-gray-700 space-y-1">
                              <div>
                                Report: {event.report.format} • Students Verified: {event.report.studentsVerified}
                              </div>
                              {typeof event.report.photosCount === 'number' && (
                                <div>
                                  📷 Photos attached: {event.report.photosCount}
                                  {event.report.photoNames && event.report.photoNames.length > 0 && <div className="mt-1">Files: {event.report.photoNames.join(', ')}</div>}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <Badge className={event.status === 'scheduled' ? 'bg-[#FF9933] hover:bg-[#FF9933]' : 'bg-green-600 hover:bg-green-600'}>
                        {event.status === 'scheduled' ? 'Upcoming' : 'Completed'}
                      </Badge>
                    </div>

                    {event.status === 'completed' && event.report && (
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => handleDownloadEventReport(event)}>
                        <FileText className="w-4 h-4 mr-2" />
                        Download {event.report.format} Report
                      </Button>
                    )}
                  </div>
                ))}
                {events.length === 0 && <p className="text-sm text-gray-500">No events recorded yet. Create your first event above.</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* REPORTS */}
      {currentTab === 'reports' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Reports & Documentation</h2>
            <p className="text-gray-600">Upload event reports and generate panchayat-level reports</p>
          </div>

          <Card className="border-2 border-[#138808]">
            <CardHeader className="bg-green-50">
              <CardTitle>Upload Event Report</CardTitle>
              <CardDescription>Select a scheduled event, submit report & mark it as completed</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <form className="space-y-4" onSubmit={handleSubmitReport}>
                <div>
                  <label className="text-sm font-medium">Event Name</label>
                  <select className="w-full mt-1 p-2 border rounded" value={selectedReportEventId} onChange={(e) => setSelectedReportEventId(e.target.value ? Number(e.target.value) : '')}>
                    <option value="">Select event</option>
                    {events.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.title} - {e.date} ({e.status === 'scheduled' ? 'Scheduled' : e.report ? 'Reported' : 'Completed'})
                      </option>
                    ))}
                    {events.length === 0 && <option disabled>No events available</option>}
                  </select>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Total Attendees</label>
                    <Input type="number" name="totalAttendees" placeholder="Number of participants" className="mt-1" value={reportForm.totalAttendees} onChange={handleReportInputChange} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Students Verified</label>
                    <Input type="number" name="studentsVerified" placeholder="Number verified" className="mt-1" value={reportForm.studentsVerified} onChange={handleReportInputChange} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Report Format</label>
                    <select name="format" className="w-full mt-1 p-2 border rounded" value={reportForm.format} onChange={handleReportInputChange}>
                      <option value="PDF">PDF</option>
                      <option value="Excel">Excel</option>
                      <option value="CSV">CSV</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Activity Summary</label>
                  <textarea name="summary" className="w-full mt-1 p-2 border rounded h-24" placeholder="Brief summary of the event activities and outcomes..." value={reportForm.summary} onChange={handleReportInputChange} />
                </div>

                <div>
                  <label className="text-sm font-medium">Upload Event Photos</label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#138808] transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to select photos (stored and used in PDF)</p>
                    {reportPhotos.length > 0 && (
                      <>
                        <div className="mt-2 text-xs text-gray-600">Selected {reportPhotos.length} photo{reportPhotos.length > 1 ? 's' : ''}: {reportPhotos.map((p) => p.name).join(', ')}</div>
                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                          {reportPhotos.map((p, idx) => (
                            <div key={idx} className="w-16 h-16 rounded border overflow-hidden shadow-sm bg-white">
                              <img src={p.dataUrl} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*" onChange={handlePhotoChange} />
                </div>

                <Button type="submit" className="w-full bg-[#138808] hover:bg-[#0f6906]">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Report & Mark Completed
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Generated Reports</CardTitle>
              <CardDescription>Download panchayat-level and event-wise reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Monthly Progress Report', period: 'November 2025', format: 'PDF' as ReportFormat },
                  { title: 'Village-wise Status Report', period: 'Current', format: 'Excel' as ReportFormat },
                  { title: 'Event Summary Report', period: 'Last 3 months', format: 'PDF' as ReportFormat },
                  { title: 'Student Database Export', period: 'As of today', format: 'CSV' as ReportFormat },
                ].map((report, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <div className="text-sm text-gray-600 mt-1">{report.period}</div>
                      </div>
                      <Badge variant="outline">{report.format}</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => handleDownloadStaticReport(report.title, report.format)}>
                      <FileText className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}

                {events.filter((e) => e.report).map((event) => (
                  <div key={`report-${event.id}`} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{event.title} - Event Report</h3>
                        <div className="text-sm text-gray-600 mt-1">
                          {event.date} • {event.venue}
                          <br />
                          Attendees: {event.report?.totalAttendees} • Students Verified: {event.report?.studentsVerified}
                          {typeof event.report?.photosCount === 'number' && <><br />Photos attached: {event.report.photosCount}{event.report.photoNames && event.report.photoNames.length > 0 && <><br />Files: {event.report.photoNames.join(', ')}</>}</>}
                        </div>
                      </div>
                      <Badge variant="outline">{event.report?.format}</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{event.report?.summary}</p>
                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => handleDownloadEventReport(event)}>
                      <FileText className="w-4 h-4 mr-2" />
                      Download {event.report?.format} Report
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* RESOURCES */}
      {currentTab === 'resources' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Resources & Training Materials</h2>
            <p className="text-gray-600">Access guides, posters, and training materials in local languages</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {panchayatResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-r from-orange-100 to-green-100 p-4 rounded-full mb-3">
                      <BookOpen className="w-8 h-8 text-[#002147]" />
                    </div>
                    <Badge variant="outline" className="mb-2">{resource.language}</Badge>
                    <h3 className="mb-1">{resource.name}</h3>
                    <div className="text-sm text-gray-600 mb-4">{resource.type} • {resource.size || 'N/A'}</div>
                    <Button variant="outline" className="w-full border-[#FF9933] text-[#FF9933] hover:bg-orange-50" onClick={() => window.open(resource.path, '_blank')}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* MAP */}
      {currentTab === 'map' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-[#002147] mb-1">Coverage Heat Map</h2>
              <p className="text-gray-600">Village-level DBT enablement visualization on actual map</p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="relative">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search village / PIN / address"
                  className="p-2 border rounded pl-9 w-80"
                />
                <SearchIcon className="w-4 h-4 absolute left-2 top-2.5 text-gray-400" />
              </div>

              <Button variant="outline" onClick={() => exportCoverageCSV(filteredData)}>
                <DownloadCloud className="w-4 h-4 mr-2" /> Export CSV
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Panchayat Area Map</CardTitle>
              <CardDescription>DBT enablement status across villages (click village cards to highlight)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
                <div className="h-96 rounded-lg overflow-hidden border shadow-sm">
                  <MapContainer center={[22.0, 79.0]} zoom={5} className="h-full w-full" scrollWheelZoom={false}>
                    <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* Fit map bounds to current filtered points */}
                    <FitMapBounds points={filteredData.map((p) => ({ lat: p.lat, lng: p.lng }))} />

                    {filteredData.map((village) => {
                      const total = village.enabled + village.pending;
                      const percentage = total ? (village.enabled / total) * 100 : 0;
                      const isSelected = selectedVillage === village.village;
                      let color = '#ef4444';
                      if (percentage > 75) color = '#138808';
                      else if (percentage > 50) color = '#f59e0b';

                      return (
                        <CircleMarker
                          key={village.village}
                          center={[village.lat, village.lng]}
                          radius={isSelected ? 14 : 10}
                          pathOptions={{ color, fillColor: color, fillOpacity: 0.8 }}
                          eventHandlers={{
                            click: () => setSelectedVillage(selectedVillage === village.village ? null : village.village),
                          }}
                        >
                          <LeafletTooltip direction="top" offset={[0, -10]}>
                            <div style={{ fontSize: 12, lineHeight: 1.3 }}>
                              <div style={{ fontWeight: 600 }}>{village.village}</div>
                              <div>Enabled: {village.enabled}</div>
                              <div>Pending: {village.pending}</div>
                              <div>PIN: {village.pincode}</div>
                              <div style={{ maxWidth: 180 }}>{village.address}</div>
                              <a href={village.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0ea5a3', textDecoration: 'underline', display: 'block', marginTop: 4 }}>
                                Open in Google Maps
                              </a>
                            </div>
                          </LeafletTooltip>
                        </CircleMarker>
                      );
                    })}
                  </MapContainer>
                </div>

                <div className="space-y-3">
                  {filteredData.map((village) => {
                    const total = village.enabled + village.pending;
                    const percentage = total ? Math.round((village.enabled / total) * 100) : 0;
                    const high = percentage > 75;
                    const medium = percentage > 50;
                    const colorClass = high ? 'bg-green-100 text-green-800' : medium ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';
                    return (
                      <button
                        key={village.village}
                        type="button"
                        onClick={() => setSelectedVillage(selectedVillage === village.village ? null : village.village)}
                        className={`w-full text-left p-3 rounded border flex items-center justify-between gap-3 hover:shadow-sm transition-shadow ${selectedVillage === village.village ? 'border-[#FF9933] bg-orange-50' : 'border-gray-200 bg-white'}`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#FF9933]" />
                            <span className="font-medium">{village.village}</span>
                          </div>
                          <div className="mt-1 text-xs text-gray-600">
                            {village.address}
                            <br />
                            PIN: {village.pincode}
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>{percentage}% DBT</span>
                          <a href={village.mapsUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline mt-2">Directions →</a>
                        </div>
                      </button>
                    );
                  })}

                  <p className="text-xs text-gray-500 mt-2">
                    <span className="font-semibold">Legend:</span> Green = High coverage (&gt; 75%), Yellow = Moderate coverage (51–75%), Red = Low coverage (≤ 50%).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredData.map((village, index) => {
              const total = village.enabled + village.pending;
              const percentage = total ? ((village.enabled / total) * 100).toFixed(0) : '0';
              return (
                <Card key={index} className="border-2" style={{ borderColor: Number(percentage) > 75 ? '#138808' : Number(percentage) > 50 ? '#f59e0b' : '#ef4444' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#FF9933]" />
                        {village.village}
                      </span>
                      <Badge className={Number(percentage) > 75 ? 'bg-green-100 text-green-800' : Number(percentage) > 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>{percentage}%</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>
                            {village.enabled}/{total}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${Number(percentage) > 75 ? 'bg-[#138808]' : Number(percentage) > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-green-50 rounded text-center">
                          <div className="text-[#138808]">{village.enabled}</div>
                          <div className="text-xs text-gray-600">Enabled</div>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded text-center">
                          <div className="text-yellow-600">{village.pending}</div>
                          <div className="text-xs text-gray-600">Pending</div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600">{village.address}</div>
                      <div>
                        <a className="text-blue-600 underline text-xs" href={village.mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
