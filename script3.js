// ==========================================
// 1. PF और सैलरी कैलकुलेटर
// ==========================================
function calculatePF() {
    const basic = parseFloat(document.getElementById('calcBasic').value);
    
    if (!basic || basic <= 0) {
        return alert("कृपया सही बेसिक सैलरी (Basic Salary) दर्ज करें!");
    }

    // PF नियम: बेसिक सैलरी का 12% कर्मचारी का और 12% कंपनी का कटता है
    const pfEmployee = basic * 0.12; 
    const pfEmployer = basic * 0.12;
    const totalPf = pfEmployee + pfEmployer;
    
    // सैलरी से सिर्फ कर्मचारी का हिस्सा कटेगा
    const netSalary = basic - pfEmployee; 

    const resultDiv = document.getElementById('calcResult');
    resultDiv.innerHTML = `
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #0d47a1;">
            <p>बेसिक सैलरी: <b>₹${basic.toFixed(2)}</b></p>
            <p>आपका PF (12%): <b>₹${pfEmployee.toFixed(2)}</b></p>
            <p>कंपनी का PF (12%): <b>₹${pfEmployer.toFixed(2)}</b></p>
            <hr style="margin: 8px 0;">
            <p style="color: #d32f2f;">कुल PF जमा (24%): <b>₹${totalPf.toFixed(2)}</b></p>
            <p style="color: #2e7d32; font-size: 18px;">हाथ में मिलने वाली सैलरी: <b>₹${netSalary.toFixed(2)}</b></p>
        </div>
    `;
}

// ==========================================
// 2. डिजिटल मजदूर ID कार्ड जनरेटर (QR कोड के साथ)
// ==========================================
function generateIDCard() {
    const name = document.getElementById('idName').value.trim();
    const skill = document.getElementById('idSkill').value.trim();
    
    if (!name || !skill) {
        return alert("कृपया अपना नाम और काम/स्किल दोनों भरें!");
    }

    // QR कोड के लिए डेटा तैयार करना
    const qrData = encodeURIComponent(`APANA INDIA\nName: ${name}\nSkill: ${skill}`);
    
    // एक फ्री API का इस्तेमाल करके QR कोड की इमेज बनाना
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qrData}`;
    
    // ID कार्ड का डिज़ाइन
    const cardHTML = `
        <div style="border: 3px solid #0d47a1; border-radius: 12px; padding: 20px; text-align: center; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); max-width: 300px; margin: 0 auto;">
            <h3 style="color: #0d47a1; margin-bottom: 2px;">🇮🇳 APANA INDIA</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 15px;">डिजिटल मजदूर पहचान पत्र</p>
            
            <img src="${qrUrl}" alt="QR Code" style="margin-bottom: 15px; border: 1px solid #eee; border-radius: 5px;">
            
            <h2 style="margin-bottom: 5px; color: #333;">${name}</h2>
            <p style="color: #4CAF50; font-weight: bold; font-size: 16px; margin-bottom: 15px;">🛠️ ${skill}</p>
            
            <div style="background: #f4f7f6; padding: 5px; border-radius: 5px; font-size: 11px; color: #555;">
                यह एक डिजिटल कार्ड है। QR स्कैन करके जानकारी देखें।
            </div>
        </div>
    `;
    
    document.getElementById('idCardResult').innerHTML = cardHTML;
}
