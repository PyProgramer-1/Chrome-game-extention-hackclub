let count = parseFloat(localStorage.getItem('clicks')) || 0;
let x = parseFloat(localStorage.getItem('x')) || 1;
let x1= parseFloat(localStorage.getItem('x1')) || 0;
let u1 = parseInt(localStorage.getItem('upgrades')) || 0; 
let clickCount = 0;
const cpsLimit = 10;
const switchButton = document.getElementById('colorSwitch');
switchButton.addEventListener('change', () => {
    if (switchButton.checked) {
      document.body.style.backgroundColor = "black";
    } else {
      // Switch is unchecked, revert to lightblue
      document.body.style.backgroundColor = 'lightblue';
    }
  });
let passiveUpgradeActive = false;
document.getElementById('counter').innerText = `Clicks: ${count.toFixed(2)}`;
setInterval(() => {
    clickCount = 0;
}, 1000);

function counting() {
    if (clickCount < cpsLimit) {
        count += x;
        clickCount++;
        document.getElementById('counter').innerText = `Clicks: ${count.toFixed(2)}`;
        localStorage.setItem('clicks', count);
    } else {
        console.log("Autoclicker detected! Slow down.");
    }
}

function upgrade() {
    const upgradeButton = document.getElementById('Upg');
    if (count >= 5) {
        x += 0.2;
        u1 += 1;
        upgradeButton.innerText = `Upgrade ${u1}`;
        count -= 5;
        localStorage.setItem('clicks', count);  // Save the updated click count
        localStorage.setItem('x', x);  // Save the updated x value
        localStorage.setItem('upgrades', u1);
    } else {
        alert("Not enough clicks!"); 
    }
    document.getElementById('counter').innerText = `Clicks: ${count}`;
}

function passiveupgrade() {
    if (!passiveUpgradeActive && count >= 10) {
        x1+=1
        passiveUpgradeActive = true;
        count -= 10;
        document.getElementById('Passive').innerText = `Mining clicks...`;
        const pickaxe = document.getElementById('pickaxe');
        pickaxe.style.display = 'block';
        localStorage.setItem('clicks', count)
        setInterval(() => {
            count += 0.2*x1;
            document.getElementById('counter').innerText = `Clicks: ${count}`;
        }, 1000);
    } else if (count < 10) {
        alert("Not enough clicks!");
    }
}

document.getElementById('countButton').addEventListener('click', counting);
document.getElementById('Upg').addEventListener('click', upgrade);
document.getElementById('Passive').addEventListener('click', passiveupgrade);
