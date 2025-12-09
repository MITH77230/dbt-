import { useState, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  HelpCircle,
  Search,
  MessageCircle,
  FileText,
  Video,
  BookOpen,
  Phone,
  Mail,
  ExternalLink,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';

/* ---------- FAQ DATA (from Word file) ---------- */

const faqs = [
  {
    category: 'Student',
    questions: [
      {
        q: 'What is the difference between Aadhaar-linked and DBT-enabled accounts?',
        a: 'Aadhaar-linked means Aadhaar is connected to the bank. DBT-enabled means your Aadhaar is activated for government transfers through NPCI. Only DBT-enabled accounts receive scholarships.',
      },
      {
        q: 'How do I check if my account is DBT-enabled?',
        a: 'Use the DBT Status Check tool on the website, or ask your bank branch/CSC to confirm if your Aadhaar is seeded in NPCI.',
      },
      {
        q: 'I did not receive my scholarship. What should I do?',
        a: 'Verify if your account is DBT-enabled, check bank SMS for failures, and contact your bank to fix Aadhaar seeding issues.',
      },
      {
        q: 'Can I use multiple bank accounts for DBT?',
        a: 'No. Only one Aadhaar-seeded bank account will receive DBT benefits. Use a single active account.',
      },
      {
        q: 'Where can I update my mobile number?',
        a: 'Visit your bank branch and update your mobile number linked to your bank account.',
      },
      {
        q: 'What documents do I need for Aadhaar seeding?',
        a: 'Carry your Aadhaar card, bank passbook, and one valid ID to your bank/CSC.',
      },
    ],
  },
  {
    category: 'Student Support',
    questions: [
      {
        q: 'How do I check if my bank account is DBT-enabled?',
        a: 'Use the portal’s self-verification tool by entering your bank details and Aadhaar-linked account information.',
      },
      {
        q: 'What should I do if my bank says my Aadhaar is not seeded?',
        a: 'Visit your bank branch with your Aadhaar, passbook, and mobile number to request Aadhaar seeding.',
      },
      {
        q: 'Why is my scholarship not received yet?',
        a: 'Ensure your bank account is DBT-enabled. Confirm status on the portal or verify with your bank.',
      },
      {
        q: 'How long does Aadhaar seeding take?',
        a: 'Banks typically take 24–48 hours to update seeding in NPCI. Check again after 2 days.',
      },
      {
        q: 'Can I use any bank account for DBT?',
        a: 'Yes, but the account must be Aadhaar-seeded and DBT-enabled to receive benefits.',
      },
      {
        q: 'How do I know if my Aadhaar is linked to multiple accounts?',
        a: 'NPCI only activates one account for DBT. Visit your bank to verify which account is active.',
      },
      {
        q: 'I changed my mobile number. Should I update it?',
        a: 'Yes, update mobile number in your bank and scholarship profile to receive OTPs and alerts.',
      },
      {
        q: 'The portal shows “Not DBT Enabled.” What now?',
        a: 'Visit your bank and request Aadhaar seeding. Return to the portal after seeding is updated.',
      },
      {
        q: 'Can I change my DBT-enabled account later?',
        a: 'Yes, but you must request Aadhaar de-seeding from the old bank and re-seeding from the new bank.',
      },
      {
        q: 'Is Aadhaar mandatory for scholarship?',
        a: 'Yes, Aadhaar-authenticated DBT accounts are mandatory for receiving government benefits.',
      },
    ],
  },
  {
    category: 'Institution',
    questions: [
      {
        q: 'How can institutions track DBT readiness of students?',
        a: 'Institutions can log in to the dashboard, view student-wise DBT status, and download reports for awareness drives.',
      },
      {
        q: 'Can colleges upload student data?',
        a: 'Yes, institutions can upload CSV files of student records, which the system verifies and displays in the dashboard.',
      },
      {
        q: 'How can colleges conduct DBT awareness sessions?',
        a: 'Use the downloadable posters, guides, and training material provided in the Awareness Module.',
      },
      {
        q: 'How to update student status after a verification camp?',
        a: 'Use the dashboard to mark students as verified or upload the updated CSV sheet.',
      },
      {
        q: 'Can colleges access DBT analytics?',
        a: 'Yes, institutions get insights on DBT-enabled percentages and student readiness indicators.',
      },
    ],
  },
  {
    category: 'Gram Panchayat',
    questions: [
      {
        q: 'How can Panchayats track village-level DBT status?',
        a: 'The Panchayat dashboard shows ward-wise DBT-enabled percentages and student lists.',
      },
      {
        q: 'Can Panchayats schedule awareness drives?',
        a: 'Yes, officers can create event schedules, download attendance sheets, and upload reports/photos.',
      },
      {
        q: 'Where can Panchayats get awareness materials?',
        a: 'Posters, banners, and leaflets are available in the Awareness section for easy download and printing.',
      },
      {
        q: 'How can Gram Panchayats verify student details?',
        a: 'Officers can check student DBT readiness through the dashboard’s verification module.',
      },
      {
        q: 'Can Panchayats generate DBT progress reports?',
        a: 'Yes, the system allows generating auto-formatted reports for meetings and documentation.',
      },
      {
        q: 'How do Panchayat officers access village-level data?',
        a: 'Log in to the Panchayat Dashboard to view DBT-enabled percentages and student statistics.',
      },
      {
        q: 'How to download posters for awareness campaigns?',
        a: 'Go to the Awareness Section and download PDFs in local languages.',
      },
      {
        q: 'How do I verify student status during a camp?',
        a: 'Use the verification tool in the dashboard to check Aadhaar seeding and DBT activation.',
      },
      {
        q: 'Can Panchayats track student-level progress?',
        a: 'Yes, officers can view each student’s DBT readiness and identify who still needs seeding.',
      },
      {
        q: 'How often should Panchayats update reports?',
        a: 'Officers should update activity and verification reports after every awareness drive.',
      },
      {
        q: 'Are Gram Panchayats responsible for Aadhaar seeding?',
        a: 'No, they guide students and coordinate with banks, but only banks perform seeding.',
      },
      {
        q: 'How to check village DBT ranking?',
        a: 'Use the analytics dashboard to view local rankings and performance insights.',
      },
      {
        q: 'What if internet is slow during camp?',
        a: 'Use offline attendance sheets and update data later through the dashboard.',
      },
      {
        q: 'Can Panchayats print student lists?',
        a: 'Yes, officers can download and print student DBT-status lists for offline verification.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'I am unable to receive the OTP. What should I do?',
        a: 'Ensure your mobile number is linked with Aadhaar and your network is stable. Wait 2 minutes and try again. If still not received, contact your bank to verify mobile number status.',
      },
      {
        q: 'Why is the dashboard not loading?',
        a: 'Check your internet connection, refresh the page, or try after clearing browser cache. If the issue persists, use a different browser or report the error code to support.',
      },
      {
        q: 'My Aadhaar verification is failing. What should I do?',
        a: 'Ensure details match exactly with Aadhaar records. Avoid spelling errors. If mismatch continues, update Aadhaar details at the nearest Aadhaar centre.',
      },
      {
        q: 'The status check tool is not showing any results. Why?',
        a: 'This happens when entered bank details are incomplete or incorrect. Re-enter bank name and last 4 digits carefully. If still blank, system may be under maintenance.',
      },
      {
        q: 'Why is the PDF not downloading?',
        a: 'Allow downloads in your browser settings, make sure pop-ups are enabled, and ensure your device has enough storage space.',
      },
      {
        q: 'My session keeps expiring automatically. How can I fix it?',
        a: 'Avoid using multiple tabs, ensure stable internet, and stay active. The system auto-logs out after inactivity for security.',
      },
      {
        q: 'The portal shows “Server Busy”. What does it mean?',
        a: 'This appears during heavy traffic. Try again after a few minutes or use off-peak hours for better performance.',
      },

      // ---- Big Technical set 1 ----
      {
        q: 'I forgot my password. How do I reset it?',
        a: "Click on 'Forgot Password' on the login page, enter your registered mobile or Aadhaar, and follow the OTP instructions.",
      },
      {
        q: 'Why am I unable to upload documents?',
        a: 'Ensure your file is PDF, under 2MB, no special characters in the file name, and check your internet connection.',
      },
      {
        q: 'Why is the portal showing an error?',
        a: 'Refresh the page, clear browser cache, try a different browser, and retry. If issue continues, note the error code and contact support.',
      },
      {
        q: 'Which browsers are supported?',
        a: 'Google Chrome (v90+), Firefox (v88+), Edge (v90+), Safari (v14+) with JavaScript enabled.',
      },
      {
        q: 'The page is not loading. What should I do?',
        a: 'Check your internet, try reloading, switch browser, or disable any active VPN/ad blocker.',
      },
      {
        q: 'My dashboard is blank. Why?',
        a: 'Your session may have expired. Log out, clear cache, and log in again.',
      },
      {
        q: 'Why am I not receiving OTP?',
        a: 'Check network coverage, ensure your mobile is not in DND mode, and verify the number registered with your account.',
      },
      {
        q: 'I entered OTP but it says invalid.',
        a: 'Use the latest OTP, avoid multiple requests, and enter the code before it expires.',
      },
      {
        q: 'The website is slow. What should I do?',
        a: 'Try during non-peak hours, ensure stable internet, and close other heavy applications.',
      },
      {
        q: 'How do I update my mobile number?',
        a: "Visit your profile section → click 'Edit Details' → verify updates using OTP.",
      },
      {
        q: 'I cannot download my application. Why?',
        a: 'Pop-ups may be blocked. Enable pop-ups or try another browser.',
      },
      {
        q: 'Why is my Aadhaar not verifying?',
        a: 'Ensure your Aadhaar name, birth year, and gender match your bank/KYC details exactly.',
      },
      {
        q: 'The system says “Aadhaar already linked to another account”. What should I do?',
        a: 'Visit your bank to update Aadhaar mapping or request remapping to your active account.',
      },
      {
        q: 'My session keeps logging out automatically.',
        a: 'Avoid multiple tabs, maintain internet stability, or re-login after clearing cookies.',
      },
      {
        q: 'Why am I seeing a blank white screen?',
        a: 'Your browser may be outdated. Update browser or disable extensions and retry.',
      },
      {
        q: 'My uploaded document is not visible.',
        a: 'Document preview may take a few seconds. Refresh the page after upload.',
      },
      {
        q: 'Why is the verification button not working?',
        a: 'Check required fields, ensure CAPTCHA is completed, and try a different device.',
      },
      {
        q: 'How do I clear browser cache?',
        a: "Go to browser settings → Privacy → Clear browsing data → Select cache and cookies → Confirm.",
      },
      {
        q: 'The portal says my account is locked.',
        a: 'After 5 failed login attempts your account locks. Wait 30 minutes or reset password.',
      },
      {
        q: 'Why does the PDF show corrupted file?',
        a: 'Ensure printing/download is complete before closing the tab and avoid unstable internet during download.',
      },
      {
        q: 'The system shows “Invalid Bank IFSC”. What should I do?',
        a: 'Verify the IFSC from your passbook or bank website and re-enter correctly.',
      },
      {
        q: 'Why can’t I submit my form?',
        a: 'Check mandatory fields, ensure file uploads are complete, and verify CAPTCHA.',
      },
      {
        q: 'My data is not saving.',
        a: 'Avoid using back button, ensure stable internet, and save section-wise.',
      },
      {
        q: 'Why are charts not loading on the dashboard?',
        a: 'Your browser may block scripts. Enable JavaScript in settings.',
      },
      {
        q: 'Login page refreshes automatically.',
        a: 'Disable auto-fill extensions, use incognito mode, or try another browser.',
      },
      {
        q: 'I am stuck on the loading screen.',
        a: 'Clear cookies, reload the page, or open the portal in a new browser window.',
      },
      {
        q: 'How do I enable JavaScript?',
        a: 'Go to browser settings → Site settings → JavaScript → Enable.',
      },
      {
        q: 'Why is my Aadhaar showing mismatch?',
        a: 'Your Aadhaar details must match your bank exactly. Update at Aadhaar Seva Kendra if incorrect.',
      },
      {
        q: 'Portal says “Network Error”. What should I do?',
        a: 'Check WiFi/mobile data, turn airplane mode on/off, or try restarting your router.',
      },
      {
        q: 'I cannot see my submitted applications.',
        a: 'Refresh dashboard, re-login, or ensure the form was submitted successfully.',
      },

      // ---- Technical set 2 ----
      {
        q: 'The page is not loading. What can I do?',
        a: 'Check your internet connection, refresh the page, try opening the portal in an incognito window, or switch your browser.',
      },
      {
        q: 'I see a blank white screen when I open the portal. Why?',
        a: 'This usually happens due to outdated browser cache. Clear cache, disable browser extensions, and try again.',
      },
      {
        q: 'My OTP is not coming. How should I fix it?',
        a: 'Ensure your mobile number is active, network is available, and your SIM is not in DND mode. If still not received, try resend after 60 seconds.',
      },
      {
        q: 'I am unable to verify my Aadhaar on the portal. What could be the issue?',
        a: 'Your Aadhaar may not be seeded in NPCI. Visit your bank to confirm seeding and retry after 48 hours.',
      },
      {
        q: 'The system shows “User Already Exists.” What does this mean?',
        a: 'Your Aadhaar or mobile is already registered. Try logging in instead of signing up or reset your password.',
      },
      {
        q: 'My login session expires frequently. How do I avoid this?',
        a: 'Avoid multiple logins from different devices and ensure you stay active by navigating the portal.',
      },
      {
        q: 'Why is the website asking for browser permissions?',
        a: 'Some features require file upload, camera access (optional), or notifications for OTP alerts. You can choose to allow or deny.',
      },
      {
        q: 'PDF preview is not showing on the portal. Why?',
        a: 'PDF preview requires browser PDF viewer support. Update your browser or download the PDF to view it offline.',
      },
      {
        q: 'The dashboard charts are not loading.',
        a: 'Analytics require a stable connection. Reload your dashboard or check if your browser blocks scripts.',
      },
      {
        q: 'What file formats are supported for upload?',
        a: 'The portal supports PDF, JPEG, JPG, and PNG formats. Check document requirements for each section.',
      },
      {
        q: 'Why is my uploaded document showing 0 KB?',
        a: 'This happens if upload was interrupted. Re-upload using a stable connection and ensure the file is not corrupted.',
      },
      {
        q: 'The portal says my Aadhaar is invalid. What to do?',
        a: 'Verify that you entered a 12-digit Aadhaar number correctly. If correct, visit UIDAI to ensure your Aadhaar is active.',
      },
      {
        q: 'Why does my mobile number show “already linked”?',
        a: 'Your number may be linked to an older account. Contact helpdesk to request unlinking after verifying your identity.',
      },
      {
        q: 'Why can’t I download my acknowledgement slip?',
        a: 'Check pop-up permissions in your browser. Enable pop-ups or try downloading in incognito mode.',
      },
      {
        q: 'I am facing a timeout error. What does it mean?',
        a: 'Your connection may be slow. Refresh the page, avoid multiple tabs, and ensure stable internet.',
      },

      // ---- Technical set 3 ----
      {
        q: 'The website is loading very slowly. What should I do?',
        a: 'Check your internet connection, close background apps, try refreshing the page, or switch to a faster network. If slow for all users, the server may be under maintenance.',
      },
      {
        q: 'The OTP for login is not coming. What can I do?',
        a: 'Ensure your mobile number is active, remove DND settings, restart your phone, and request OTP after 60 seconds. If still not received, try using an alternate number.',
      },
      {
        q: 'I am unable to register because it shows “User already exists”. How do I fix this?',
        a: "This means your Aadhaar or mobile number is already registered. Try logging in or use the 'Forgot Password' option to reset your credentials.",
      },
      {
        q: 'The page shows “Session Expired”. What does this mean?',
        a: 'You were inactive for too long. Refresh the page and log in again to continue securely.',
      },
      {
        q: 'I am unable to download my DBT Status Report. What should I check?',
        a: 'Ensure pop-ups are enabled, storage permission is granted, and your browser supports PDF downloads. Try switching to Chrome or Firefox.',
      },
      {
        q: 'The website is not opening on my phone. What could be wrong?',
        a: 'Clear browser cookies, ensure JavaScript is enabled, update your browser, or try using the desktop version of the site.',
      },
      {
        q: 'Why are the charts and graphs not loading in the dashboard?',
        a: 'This may occur due to slow internet or disabled JavaScript. Refresh the page and make sure your browser supports data visualization libraries.',
      },
      {
        q: 'I accidentally uploaded the wrong document. How do I replace it?',
        a: 'Go to your profile, select “Edit Documents”, delete the incorrect file, and upload the correct one in PDF format under 2MB.',
      },
      {
        q: 'The website shows “Invalid Aadhaar Number”. What does it mean?',
        a: 'Ensure you entered the 12-digit Aadhaar correctly without spaces. If still invalid, verify with UIDAI or recheck the digits.',
      },
      {
        q: 'Why does the system log me out automatically?',
        a: 'For security reasons, the portal logs out after a period of inactivity to protect your data. You can log in again anytime.',
      },

      // ---- Technical set 4 ----
      {
        q: 'The website is loading slowly. What can I do?',
        a: 'Check your internet speed, close background apps, refresh the page, or switch to a stronger network.',
      },
      {
        q: 'I cannot open the DBT Status Check page. Why?',
        a: 'This may be due to heavy traffic or maintenance. Wait a few minutes and try again, or reload using a different browser.',
      },
      {
        q: 'Why is my Aadhaar verification taking long to load?',
        a: 'Server requests may be queued. Please wait for 10–20 seconds or retry after clearing your browser cache.',
      },
      {
        q: 'My dashboard is showing blank charts. What should I do?',
        a: 'Enable JavaScript in your browser and refresh the page. Charts require JavaScript to display properly.',
      },
      {
        q: 'Why am I unable to download the report?',
        a: 'Check if pop-up permissions are enabled in your browser and ensure you have enough storage on your device.',
      },
      {
        q: 'The login OTP is not coming. Why?',
        a: 'Your mobile number may not be linked or network might be weak. Wait for 2 minutes or try “Resend OTP”.',
      },
      {
        q: 'OTP entered is showing invalid. What should I do?',
        a: 'Verify you typed the correct digits, ensure no space is added, and try requesting a fresh OTP.',
      },
      {
        q: 'The site logs me out automatically. Why?',
        a: 'For security, the portal auto-logs out after inactivity. Please log in again and keep the tab active.',
      },
      {
        q: 'My form is not submitting. What could be the issue?',
        a: 'Check if all mandatory fields are filled, remove special characters, and ensure your file uploads are correct.',
      },
      {
        q: 'Why am I getting “Session Expired”?',
        a: 'Your session timed out due to inactivity. Refresh and log in again to continue.',
      },
      {
        q: 'Why is the Aadhaar upload button disabled?',
        a: 'You may need to complete earlier steps first. Complete profile details to enable document upload.',
      },
      {
        q: 'The portal shows “Invalid Format” for my file. Why?',
        a: 'Upload only PDF/JPEG/PNG files and ensure the filename has no special characters like #, %, or &.',
      },
      {
        q: 'My Aadhaar number is masked incorrectly on the screen.',
        a: 'For security reasons, the system masks most digits. You only need to verify the visible ones.',
      },
      {
        q: 'I clicked submit but nothing happened. What should I do?',
        a: 'Try clicking once, wait 5–10 seconds, or refresh the page to avoid multiple submissions.',
      },
      {
        q: 'Why is the portal asking for location access?',
        a: 'Location helps Panchayat/College modules assess area-wise DBT awareness and analytics.',
      },
      {
        q: 'The dropdown menu is not opening. Why?',
        a: 'Refresh the browser, ensure JavaScript is enabled, or try using Chrome/Firefox.',
      },
      {
        q: 'I am seeing repeated pop-up warnings. How to fix?',
        a: 'Clear browser cookies, disable interfering extensions, and reload the website.',
      },
      {
        q: 'Why is the website not working on my phone?',
        a: 'Try desktop mode or update your mobile browser. Some features may need a larger screen.',
      },
      {
        q: 'The verification status is stuck at loading.',
        a: 'This may occur due to slow API response. Refresh or retry after a few minutes.',
      },
      {
        q: 'I cannot see the newly added student list.',
        a: 'Click “Refresh Data” on the dashboard or log out and back in to reload data.',
      },
      {
        q: 'Why are map visuals not showing?',
        a: 'Map feature requires GPS permissions and stable internet. Enable both and reload.',
      },
      {
        q: 'The portal says “Access Denied”. What does it mean?',
        a: 'You may be trying to open a module not assigned to your user type. Switch to the correct login role.',
      },
      {
        q: 'Why do I see “Data not found”?',
        a: 'Your details may not be registered yet. Recheck spelling or update your profile.',
      },
      {
        q: 'I am unable to view previous submissions.',
        a: 'Click on “History” section or refresh data. Older logs may take a moment to load.',
      },
      {
        q: 'The website is showing incorrect date/time.',
        a: 'Check your device clock settings. Syncing your device time fixes the issue.',
      },
      {
        q: 'I uploaded the wrong document. How can I change it?',
        a: 'Go to “Edit Profile” or “Update Documents”, delete the old file, and re-upload.',
      },
      {
        q: 'Why is the portal showing “API Error”?',
        a: 'It may be temporary. Retry after a minute or contact helpdesk with the error code displayed.',
      },
      {
        q: "I can't zoom charts or maps.",
        a: 'Use desktop browser for full interactive features. Mobile zoom support is limited.',
      },
      {
        q: 'The portal language did not change after selection.',
        a: 'Refresh the page after choosing your preferred language.',
      },
      {
        q: "Why can't I see the download button?",
        a: 'The button appears only after completing previous steps or verifying your data.',
      },

      // ---- Technical set 5 ----
      {
        q: 'The page is taking too long to load. What should I do?',
        a: 'Check your internet connection, refresh the page, close unused tabs, or switch to a stable network. Use Chrome for best performance.',
      },
      {
        q: 'My dashboard is not updating after submitting details. Why?',
        a: 'Your session may be cached. Log out, clear browser cache, and log in again to refresh your dashboard data.',
      },
      {
        q: 'Why am I seeing “Session Expired” repeatedly?',
        a: 'This occurs due to inactivity. Log in again and keep the page active. Avoid opening the portal in multiple tabs.',
      },
      {
        q: 'The OTP is not coming. What do I do?',
        a: 'Ensure your mobile number is active, has network coverage, is linked with Aadhaar, and is not in DND mode. Try resending OTP after 60 seconds.',
      },
      {
        q: 'My Aadhaar verification is failing. How do I fix it?',
        a: 'Check that the details match your Aadhaar card exactly, including spelling and date of birth. If mismatch continues, update Aadhaar at an enrollment center.',
      },
      {
        q: 'Why is the portal showing “Document format invalid”?',
        a: 'Only PDF/JPG formats are accepted. Rename the file without spaces or special characters and reupload within the allowed size.',
      },
      {
        q: 'The bank list is not loading. What should I do?',
        a: 'Refresh the page or switch to another browser. If the issue persists, check your internet or try again after some time.',
      },
      {
        q: 'I accidentally entered wrong details. Can I edit them?',
        a: 'Yes, go to your profile settings and click on “Edit Details”. For Aadhaar-related details, visit your bank or Aadhaar center if changes are locked.',
      },
      {
        q: 'Why is my DBT status showing “Not Verified”?',
        a: 'Your bank may not have processed Aadhaar seeding yet. Visit your branch, request NPCI seeding, and wait 24–48 hours.',
      },
      {
        q: 'How do I download my application receipt?',
        a: "Open your dashboard → Go to 'Downloads' → Click 'Application Receipt'. Ensure pop-up downloads are enabled in your browser.",
      },

      // ---- Technical set 6 ----
      {
        q: 'The page is not loading on my device. What should I do?',
        a: 'Check your internet connection, try refreshing the page, switch to a different network, or reopen the website in a supported browser like Chrome or Firefox.',
      },
      {
        q: 'I am getting a blank white screen on login. How do I fix it?',
        a: 'Clear browser cache, disable any browser extensions like ad blockers, and reload the portal. If issue continues, try incognito mode.',
      },
      {
        q: 'Why is the OTP not coming to my mobile number?',
        a: 'Ensure your mobile number is active, not in DND mode, has good network, and matches the number registered in your profile. Request OTP again after 30 seconds.',
      },
      {
        q: 'My session keeps expiring automatically. What should I do?',
        a: 'Avoid staying idle, enable cookies, and ensure your browser is not in private/incognito mode.',
      },
      {
        q: 'I uploaded the wrong document. How can I replace it?',
        a: "Go to the 'Documents' section, click 'Replace' next to the incorrect file, and upload the correct PDF within the size limit.",
      },
      {
        q: 'Why is my Aadhaar verification failing repeatedly?',
        a: 'Check if your Aadhaar details match your bank and portal profile. Ensure your date of birth, name, and mobile number are correct.',
      },
      {
        q: 'I cannot see the submit button on the form. What\'s wrong?',
        a: 'Zoom out your screen to 90%, scroll down fully, and ensure your browser window is maximized.',
      },
      {
        q: 'Why does the system keep saying “Invalid Captcha”?',
        a: 'Make sure you type characters exactly as shown, refresh the captcha, and check language/keyboard settings.',
      },
      {
        q: 'The portal shows “Service Unavailable”. What does it mean?',
        a: 'The server may be busy or under maintenance. Try again in a few minutes or check for announcements on the homepage.',
      },
      {
        q: 'How do I update my registered mobile number?',
        a: 'Go to Profile → Edit → Enter new mobile number → Verify with OTP → Save changes.',
      },
      {
        q: 'My photos are getting rejected. Why?',
        a: 'Ensure photo is clear, under 100KB, recent, and taken against a light background.',
      },
      {
        q: 'I get a “Permission Denied” error when accessing dashboard.',
        a: 'This means your role is not authorized for that section. Contact your administrator to update role permissions.',
      },
      {
        q: 'Why is the status-check tool showing “Data Not Found”?',
        a: 'Your bank or Aadhaar details may not be synced yet. Recheck details or try again after 24 hours.',
      },
      {
        q: 'Can I use the portal on a mobile phone?',
        a: 'Yes, the portal supports mobile browsers, but for best performance use latest Chrome or Edge.',
      },
      {
        q: 'PDF is not opening after upload. What should I check?',
        a: 'Ensure the file is not corrupted, under 2MB, and created using a standard PDF generator.',
      },
      {
        q: 'I am unable to download my acknowledgment receipt.',
        a: 'Disable popup blockers in your browser, refresh the page, and try again in a supported browser.',
      },
      {
        q: 'After login, it redirects me to homepage again. Why?',
        a: 'Cookies may be disabled or browser cache is full. Enable cookies and clear cache.',
      },
      {
        q: 'The system is not accepting my bank IFSC code.',
        a: 'Check correct spelling, avoid spaces, and verify if the branch is active. Use RBI IFSC search if needed.',
      },
      {
        q: 'Why is the search feature not showing any results?',
        a: 'Ensure correct spelling, remove special characters, or try filtering using different keywords.',
      },
      {
        q: 'I cannot update my profile photo. What might be the issue?',
        a: 'Ensure photo is in JPG/PNG format, under 100KB, and not blurred.',
      },
      {
        q: 'The dashboard charts are not displaying.',
        a: 'Enable JavaScript in your browser and refresh the page. Charts require JS to render.',
      },
      {
        q: 'I cannot see the “Download Report” button.',
        a: 'Only admin and institute users have access. Check your role or request admin permission.',
      },
      {
        q: 'Why is the portal slow during evening hours?',
        a: 'Heavy user traffic may cause delays. Try accessing during non-peak hours.',
      },
      {
        q: 'Why am I being logged out repeatedly?',
        a: 'Your internet may be unstable. Switch networks or use a high-speed connection.',
      },
      {
        q: 'How do I change my email ID on the portal?',
        a: 'Go to Profile → Edit Email → Verify via OTP → Save changes.',
      },
      {
        q: 'My uploaded proof is showing “Pending Verification”. Why?',
        a: 'Your submission is under review. Verification usually takes 24–72 hours.',
      },
      {
        q: 'Can I save my form and submit later?',
        a: 'Yes, use the “Save as Draft” option available at the bottom of the form.',
      },
      {
        q: 'The dropdown menu is not loading options.',
        a: 'Refresh the page, ensure stable internet, and wait for the database to load options.',
      },
      {
        q: 'Why is the portal asking for re-login after page refresh?',
        a: 'Your session expired for security reasons. Log in again to continue safely.',
      },
      {
        q: 'I get “Unauthorized Request”. What does it mean?',
        a: 'You might have tried accessing a restricted URL or expired session. Log in normally and try again.',
      },

      // ---- Technical set 7 ----
      {
        q: 'My session keeps logging out automatically. What should I do?',
        a: 'This usually happens due to browser inactivity or cache issues. Refresh the page, clear cache, and ensure cookies are enabled for the portal.',
      },
      {
        q: 'The OTP is not coming to my mobile. What can I do?',
        a: 'Check network signal, wait for 2–3 minutes, avoid multiple OTP requests, and ensure your mobile number is linked with Aadhaar/bank. If still not received, retry after some time.',
      },
      {
        q: 'I am seeing a blank white screen after login. Why?',
        a: 'This occurs when browser scripts are blocked. Enable JavaScript, disable ad-blockers, refresh the page, or switch to Chrome/Firefox.',
      },
      {
        q: 'Why is the portal loading slowly?',
        a: 'Slow loading can be due to heavy traffic or weak internet. Try switching networks, closing background apps, or using the portal during non-peak hours.',
      },
      {
        q: 'I cannot find my district/village in the dropdown. What should I do?',
        a: 'Refresh the page, try again, and if still missing, contact the support team to update your location database.',
      },
      {
        q: 'The verification page is stuck. What should I do?',
        a: 'Close the tab, reopen the portal in a fresh browser window, and retry. Ensure your internet speed is stable.',
      },
      {
        q: 'My dashboard is not showing updated DBT status. Why?',
        a: 'Sometimes updates take 24–48 hours to sync. Clear cache and refresh. If it still doesn’t update, contact your institution admin.',
      },
      {
        q: 'The website shows “Server Busy”. What does it mean?',
        a: 'It means too many users are accessing the portal. Please wait a few minutes and try again.',
      },
      {
        q: 'Why am I unable to download my PDF report?',
        a: 'Ensure pop-ups are allowed in browser settings and your storage is not full. Try downloading again.',
      },
      {
        q: 'I uploaded the wrong document. How do I change it?',
        a: 'Go to “My Documents”, click “Replace File”, upload the correct PDF, and save the changes.',
      },

      // ---- Technical set 8 ----
      {
        q: 'How can I check if my Aadhaar is seeded with my bank through the portal?',
        a: 'Use the DBT-Status Checker. Enter your bank details, Aadhaar last 4 digits, and submit. You will see a DBT-enabled/Not-enabled result.',
      },
      {
        q: 'Why is the Aadhaar verification taking long?',
        a: 'NPCI verification can sometimes take longer due to server delays. Please retry after some time.',
      },
      {
        q: 'The file I uploaded appears blank. Why?',
        a: 'It may be corrupted. Re-scan the document clearly and upload a fresh PDF under 2MB.',
      },
      {
        q: 'The portal is not accepting my mobile number. What should I do?',
        a: 'Check if the number is 10 digits without spaces or special characters. Also ensure it is linked with Aadhaar.',
      },
      {
        q: 'I am getting “Invalid Input Format” error. Why?',
        a: 'This occurs when fields contain symbols or letters where only numbers are allowed. Enter correct data and retry.',
      },
      {
        q: 'I am unable to submit my form. The button is disabled.',
        a: 'Ensure all mandatory fields are filled, documents uploaded, and captcha correctly entered.',
      },
      {
        q: 'Why is my Aadhaar image not uploading?',
        a: 'Image uploads are not allowed. Only PDF format is accepted for security reasons.',
      },
      {
        q: 'My account is showing “Under Review”. What does it mean?',
        a: 'Your documents are being checked by the verification team. This process can take 1–2 working days.',
      },
      {
        q: 'I am not receiving notification emails from the portal.',
        a: 'Check spam folder, ensure your email is active, and confirm it is correctly entered in profile settings.',
      },
      {
        q: 'Why is the portal not opening on mobile?',
        a: 'Ensure you use an updated browser, enable JavaScript, and rotate the screen if needed for full view.',
      },
    ],
  },
];

const tutorials = [
  { title: 'Student Registration Process', duration: '5:30', type: 'video', views: '125K' },
  { title: 'Institution Bulk Upload Guide', duration: '8:15', type: 'video', views: '45K' },
  { title: 'Panchayat Event Management', duration: '6:45', type: 'video', views: '32K' },
  { title: 'DBT Verification Steps', duration: '4:20', type: 'video', views: '98K' },
  { title: 'How to Track Application Status', duration: '3:10', type: 'video', views: '156K' },
  { title: 'Document Upload Guidelines', duration: '5:00', type: 'video', views: '78K' },
];

const knowledgeBase = [
  // ==== STUDENT DOWNLOADS ====
  {
    title: 'Student User Manual',
    pages: 'USERMANUAL.pdf',
    downloads: 'Student',
    url: '/resources/student-downloads/USERMANUAL.pdf',
  },
  {
    title: 'Scholarship Application Guide',
    pages: 'SCHOLARSHIPAPPGUIDE.pdf',
    downloads: 'Student',
    url: '/resources/student-downloads/SCHOLARSHIPAPPGUIDE.pdf',
  },
  {
    title: 'Scholarship Application Process',
    pages: 'Scholarship App Process.pdf',
    downloads: 'Student',
    url: '/resources/student-downloads/Scholarship%20App%20Process.pdf',
  },
  {
    title: 'General Guidelines for Students',
    pages: 'Guidelines.pdf',
    downloads: 'Student',
    url: '/resources/student-downloads/Guidelines.pdf',
  },
  {
    title: 'Student FAQ',
    pages: 'FAQ.pdf',
    downloads: 'Student',
    url: '/resources/student-downloads/FAQ.pdf',
  },
  {
    title: 'DBT Complete Guidelines',
    pages: 'DBTcompleteguidelines.pdf',
    downloads: 'Student',
    url: '/resources/student-downloads/DBTcompleteguidelines.pdf',
  },
  {
    title: 'Complete DBT Guidelines for Students',
    pages: 'COMPLETEDBTGUIDELINESFORSTUDENTS.pdf',
    downloads: 'Student',
    url: '/resources/student-downloads/COMPLETEDBTGUIDELINESFORSTUDENTS.pdf',
  },
  {
    title: 'Bank Verification – All Banks',
    pages: 'Banksallverification (1).pdf',
    downloads: 'Student',
    url: '/resources/student-downloads/Banksallverification%20(1).pdf',
  },
  {
    title: 'Aadhaar Linking Steps',
    pages: 'Aadhaarlinking steps.pdf',
    downloads: 'Student',
    url: '/resources/student-downloads/Aadhaarlinking%20steps.pdf',
  },
  {
    title: 'Aadhaar Bank Linking Manual',
    pages: 'AADHAARbanklinkingmanual.pdf',
    downloads: 'Student',
    url: '/resources/student-downloads/AADHAARbanklinkingmanual.pdf',
  },

  // ==== PANCHAYAT RESOURCES ====
  {
    title: 'Panchayat Officer Onboarding Guide',
    pages: 'Panchayat Officer Onboarding Guide.pdf',
    downloads: 'Panchayat',
    url: '/resources/panchayat-resources/Panchayat%20Officer%20Onboarding%20Guide.pdf',
  },
  {
    title: 'DBT Schemes – Panchayat',
    pages: 'DBTschemes.pdf',
    downloads: 'Panchayat',
    url: '/resources/panchayat-resources/DBTschemes.pdf',
  },
  {
    title: 'About Direct Benefit Transfer (Panchayat)',
    pages: 'About Direct Benefit Transfer.pdf',
    downloads: 'Panchayat',
    url: '/resources/panchayat-resources/About%20Direct%20Benefit%20Transfer.pdf',
  },

  // ==== INSTITUTION RESOURCES ====
  {
    title: 'Institutional Onboarding Guide (English)',
    pages: 'INSTITUTIONAL ONBOARDING GUIDE ENG.pdf',
    downloads: 'Institution',
    url: '/resources/INSTITUTE-resources/INSTITUTIONAL%20ONBOARDING%20GUIDE%20ENG.pdf',
  },
  {
    title: 'DBT Schemes – Institutions',
    pages: 'DBTschemes.pdf',
    downloads: 'Institution',
    url: '/resources/INSTITUTE-resources/DBTschemes.pdf',
  },
  {
    title: 'About Direct Benefit Transfer (Institution)',
    pages: 'About Direct Benefit Transfer.pdf',
    downloads: 'Institution',
    url: '/resources/INSTITUTE-resources/About%20Direct%20Benefit%20Transfer.pdf',
  },
];

const ticketStats = [
  { label: 'Avg Response Time', value: '2.5 hrs', icon: Clock, color: 'text-blue-600 dark:text-blue-400' },
  { label: 'Resolution Rate', value: '96.8%', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
  { label: 'Active Tickets', value: '234', icon: AlertCircle, color: 'text-orange-600 dark:text-orange-400' },
  { label: 'Satisfied Users', value: '98.2%', icon: HelpCircle, color: 'text-purple-600 dark:text-purple-400' },
];

/* ---------- Chat helpers ---------- */

type ChatMessage = {
  from: 'user' | 'bot';
  text: string;
  time: string;
};

const flatFaqs = faqs.flatMap((cat) =>
  cat.questions.map((q) => ({
    q: q.q,
    a: q.a,
  })),
);

function formatTime() {
  const d = new Date();
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function getBotReply(question: string): string {
  const text = question.toLowerCase();

  if (text.includes('hello') || text.includes('hi') || text.includes('namaste')) {
    return 'Hello! 👋 How can I help you today? You can ask about DBT, Aadhaar seeding, bank status, portal issues, institutions, panchayat, or technical problems.';
  }

  let bestMatch: { q: string; a: string } | undefined;
  let bestScore = 0;

  for (const item of flatFaqs) {
    const qText = item.q.toLowerCase();
    let score = 0;
    qText.split(/\s+/).forEach((word) => {
      if (word.length > 3 && text.includes(word)) score++;
    });
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore > 0) {
    return `**${bestMatch.q}**\n\n${bestMatch.a}`;
  }

  return 'I could not find an exact answer for that. 🙏 Please try asking in a different way, or contact the helpline at 1800-11-8004 for detailed support.';
}

/* ---------- MAIN COMPONENT ---------- */

export default function Helpdesk() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      from: 'bot',
      text: 'Namaste 👋 I am DBT Help Assistant.\nAsk me about DBT status, Aadhaar seeding, bank issues, portal errors, institutions, or Gram Panchayat support.',
      time: formatTime(),
    },
  ]);

  function handleChatSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      from: 'user',
      text: trimmed,
      time: formatTime(),
    };

    const botMsg: ChatMessage = {
      from: 'bot',
      text: getBotReply(trimmed),
      time: formatTime(),
    };

    setChatMessages((prev) => [...prev, userMsg, botMsg]);
    setChatInput('');
  }

  const filteredFaqs = searchQuery
    ? faqs.map((cat) => ({
        ...cat,
        questions: cat.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
    : faqs;

  const docCategories = ['Student', 'Institution', 'Panchayat'] as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] dark:from-gray-800 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <HelpCircle className="w-12 h-12" />
            <h1 className="text-4xl">Helpdesk & Support</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl mb-8">
            Find answers to your questions, access tutorials, and get support from our dedicated team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles, FAQs, or tutorials..."
                className="pl-10 py-6 text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Support Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ticketStats.map((stat, index) => (
            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-3xl mt-2 dark:text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Support Options */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl mb-6 text-gray-900 dark:text-white">Quick Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl mb-2 dark:text-white">Call Helpline</h3>
              <p className="text-2xl text-blue-600 dark:text-blue-400 mb-2">1800-11-8004</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available 24x7</p>
            </CardContent>
          </Card>

          {/* LIVE CHAT CARD */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl mb-2 dark:text-white">Live Chat</h3>
              <Button
                type="button"
                className="mt-2 bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800"
                onClick={() => setIsChatOpen(true)}
              >
                {isChatOpen ? 'Chat Open' : 'Start Chat'}
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">9 AM - 6 PM</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl mb-2 dark:text-white">Email Support</h3>
              <p className="text-lg text-orange-600 dark:text-orange-400 mb-2">support@dbtportal.gov.in</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Response in 48 hours</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="dark:text-white text-lg">Live Chat Support</CardTitle>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Do not share Aadhaar, bank account or any sensitive information.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setIsChatOpen(false)}
              >
                Close Chat
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-80 border rounded-lg bg-slate-50 dark:bg-gray-900 overflow-hidden">
                {/* messages */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2 text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`max-w-[90%] px-3 py-2 rounded-lg whitespace-pre-wrap flex flex-col ${
                        msg.from === 'user'
                          ? 'ml-auto bg-green-600 text-white'
                          : 'mr-auto bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-gray-100'
                      }`}
                    >
                      <span>{msg.text}</span>
                      <span className="mt-1 text-[10px] opacity-70 self-end">{msg.time}</span>
                    </div>
                  ))}
                </div>
                {/* input */}
                <form
                  onSubmit={handleChatSubmit}
                  className="border-t border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 flex gap-2"
                >
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your question..."
                    className="text-xs dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  <Button type="submit" size="sm" className="text-xs px-3">
                    Send
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto dark:bg-gray-800">
            <TabsTrigger value="faq" className="dark:data-[state=active]:bg-gray-700">
              <BookOpen className="w-4 h-4 mr-2" />
              FAQs
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="dark:data-[state=active]:bg-gray-700">
              <Video className="w-4 h-4 mr-2" />
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="docs" className="dark:data-[state=active]:bg-gray-700">
              <FileText className="w-4 h-4 mr-2" />
              Documentation
            </TabsTrigger>
          </TabsList>

          {/* FAQs */}
          <TabsContent value="faq">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFaqs.map((cat) =>
                cat.questions.length ? (
                  <Card
                    key={cat.category}
                    className="dark:bg-gray-800 dark:border-gray-700 flex flex-col"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <HelpCircle className="w-4 h-4" />
                        {cat.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {cat.questions.map((item, idx) => (
                          <AccordionItem
                            key={`${cat.category}-${idx}`}
                            value={`${cat.category}-${idx}`}
                          >
                            <AccordionTrigger className="text-left text-sm">
                              {item.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                              {item.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ) : null,
              )}
            </div>
          </TabsContent>

          {/* Tutorials */}
          <TabsContent value="tutorials">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tut, idx) => (
                <Card key={idx} className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-sm dark:text-white">{tut.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {tut.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tut.duration}
                      </span>
                      <span>{tut.views} views</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documentation */}
          <TabsContent value="docs">
            <div className="space-y-6">
              {docCategories.map((docCat) => (
                <div key={docCat}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 dark:text-white">
                    <FileText className="w-4 h-4" />
                    {docCat} Resources
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {knowledgeBase
                      .filter((doc) => doc.downloads === docCat)
                      .map((doc, idx) => (
                        <Card
                          key={`${docCat}-${idx}`}
                          className="dark:bg-gray-800 dark:border-gray-700"
                        >
                          <CardContent className="p-4 flex flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-medium text-sm dark:text-white">{doc.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {doc.pages}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-[10px]">
                                {doc.downloads}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="text-xs flex items-center gap-1"
                              >
                                <a href={doc.url} target="_blank" rel="noreferrer">
                                  <Download className="w-3 h-3" />
                                  Download
                                </a>
                              </Button>
                              <a
                                href={doc.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400"
                              >
                                View <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
