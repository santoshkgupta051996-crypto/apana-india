// दिहाड़ी और दिन के आधार पर PF कैलकुलेटर
function calculatePF() {
    const dailyRate = parseFloat(document.getElementById('calcDailyRate').value) || 0;
    const daysWorked = parseFloat(document.getElementById('calcDaysWorked').value) || 0;
    
    if (dailyRate <= 0 || daysWorked <= 0) {
        document.getElementById('calcResult').innerHTML = ""; 
        return;
    }

    const totalBasic = dailyRate * daysWorked; 
    const pfEmployee = totalBasic * 0.12; 
    const pfEmployer = totalBasic * 0.12;
    const totalPf = pfEmployee + pfEmployer;
    const netSalary = totalBasic - pfEmployee; 

    document.getElementById('calcResult').innerHTML = `
        <div style="background: #fff3e0; padding: 15px; border-radius: 8px; border-left: 5px solid #FF9933; margin-top: 15px;">
            <p style="margin-bottom: 8px;">कुल कमाई (Basic): <b>₹${totalBasic.toFixed(2)}</b> <br> <small>(${dailyRate} × ${daysWorked} दिन)</small></p>
            <p style="margin-bottom: 8px;">आपका PF (12%): <b>₹${pfEmployee.toFixed(2)}</b></p>
            <p style="margin-bottom: 8px;">कंपनी का PF (12%): <b>₹${pfEmployer.toFixed(2)}</b></p>
            <hr style="margin: 8px 0; border: 0; border-top: 1px dashed #ccc;">
            <p style="color: #d32f2f; margin-bottom: 8px;">कुल PF जमा (24%): <b>₹${totalPf.toFixed(2)}</b></p>
            <p style="color: #138808; font-size: 18px; font-weight: bold;">हाथ में मिलने वाली सैलरी: <b>₹${netSalary.toFixed(2)}</b></p>
        </div>`;
}

function calculateLand() {
    const bigha = parseFloat(document.getElementById('landBigha').value);
    if (!bigha || bigha <= 0) return alert("कृपया बीघा में सही जमीन दर्ज करें!");
    const acre = bigha * 0.25;
    const hectare = acre * 0.404686;
    const sqft = acre * 43560;
    
    document.getElementById('landResult').innerHTML = `
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #FF9933;">
            <p>दी गई जमीन: <b>${bigha} बीघा</b></p>
            <p>एकड़ में: <b>${acre.toFixed(2)} Acre</b></p>
            <p>हेक्टेयर में: <b>${hectare.toFixed(2)} Hectare</b></p>
            <p>वर्ग फुट में: <b>${sqft.toFixed(0)} Sq.Ft.</b></p>
        </div>`;
}

function generateIDCard() {
    const name = document.getElementById('idName').value.trim(); const skill = document.getElementById('idSkill').value.trim();
    if (!name || !skill) return alert("कृपया अपना नाम और काम दोनों भरें!");
    const qrData = encodeURIComponent(`APANA INDIA\nName: ${name}\nSkill: ${skill}`);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qrData}`;
    
    document.getElementById('idCardResult').innerHTML = `
        <div style="border: 3px solid #FF9933; border-radius: 12px; padding: 20px; text-align: center; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); max-width: 300px; margin: 0 auto; border-bottom: 5px solid #138808;">
            <h3 style="color: #000080; margin-bottom: 2px;">🇮🇳 APANA INDIA</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 15px;">डिजिटल मजदूर पहचान पत्र</p>
            <img src="${qrUrl}" style="margin-bottom: 15px; border: 1px solid #eee; border-radius: 5px;">
            <h2 style="margin-bottom: 5px; color: #333;">${name}</h2>
            <p style="color: #138808; font-weight: bold; font-size: 16px; margin-bottom: 15px;">🛠️ ${skill}</p>
            <div style="background: #f4f7f6; padding: 5px; border-radius: 5px; font-size: 11px; color: #555;">QR स्कैन करके जानकारी देखें।</div>
        </div>`;
}
