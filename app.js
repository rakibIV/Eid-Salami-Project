
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const cardPreview = document.getElementById('cardPreview');
    const cardActions = document.getElementById('cardActions');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    const qrCodeUpload = document.getElementById('qrCodeUpload');
    const qrPreview = document.getElementById('qrPreview');
    const uploadText = document.getElementById('uploadText');
    const previewContainer = document.getElementById('previewContainer');
    
    let uploadedQrCode = null;
    
    // Handle QR code upload
    qrCodeUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedQrCode = e.target.result;
                qrPreview.src = uploadedQrCode;
                uploadText.classList.add('hidden');
                previewContainer.classList.remove('hidden');
                previewContainer.classList.add('flex');
            };
            reader.readAsDataURL(file);
        }
    });
    
    const templates = {
        traditional: {
            background: 'linear-gradient(135deg, #E2136E 0%, #9C1663 100%)',
            elements: [
                // Move moon to bottom-right corner instead of top
                { type: 'moon', x: 'bottom-10', y: 'right-10' },
                { type: 'stars', count: 20 }
            ],
            fontClass: 'font-semibold'
        },
        modern: {
            background: 'linear-gradient(135deg, #E2136E 0%, #FF4D94 100%)',
            elements: [
                // Move crescent to bottom-left corner
                { type: 'crescent', x: 'bottom-10', y: 'left-10' },
                // Adjust lantern positions to sides
                { type: 'lantern', x: 'left-5', y: 'top-1/3' },
                { type: 'lantern', x: 'right-5', y: 'bottom-1/3' }
            ],
            fontClass: 'font-medium'
        },
        cute: {
            background: 'linear-gradient(135deg, #FF90B9 0%, #E2136E 100%)',
            elements: [
                // Move moon to bottom corner with animation
                { type: 'moon', x: 'bottom-10', y: 'left-10', animation: 'float-animation' },
                { type: 'stars', count: 30 }
            ],
            fontClass: 'font-bold'
        }
    };
    

    generateBtn.addEventListener('click', function() {
        const bkashNumber = document.getElementById('bkashNumber').value;
        const name = document.getElementById('name').value;
        const heading = document.getElementById('heading').value;
        const theme = document.getElementById('theme').value;
        const message = document.getElementById('message').value || 'সবাইকে ঈদ মোবারক! সালামি পাঠাতে QR কোড স্ক্যান করুন।';
        
        if (!bkashNumber) {
            alert('অনুগ্রহ করে বিকাশ নম্বর দিন');
            return;
        }
        
        if (!uploadedQrCode) {
            alert('অনুগ্রহ করে বিকাশ QR কোড আপলোড করুন');
            return;
        }
        

        const template = templates[theme];
        
        let cardHTML = `
            <div class="card w-full h-full rounded-2xl overflow-hidden shadow-2xl relative" style="background: ${template.background}">
                <div class="stars">
                    ${generateStars(template.elements.find(e => e.type === 'stars')?.count || 0)}
                </div>
        `;
        
        template.elements.forEach(element => {
            if (element.type === 'moon') {
                cardHTML += `<div class="moon absolute ${element.x} ${element.y} ${element.animation || ''}"></div>`;
            } else if (element.type === 'crescent') {
                cardHTML += `<div class="crescent absolute ${element.x} ${element.y} ${element.animation || ''}"></div>`;
            } else if (element.type === 'lantern') {
                cardHTML += `<div class="lantern absolute ${element.x} ${element.y} ${element.animation || ''}"></div>`;
            }
        });
        

        cardHTML += `
        <div class="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-between h-full relative z-10">
            <div class="text-center mb-4 card-content w-full max-w-xs mx-auto">
                <h2 class="text-white text-xl sm:text-2xl md:text-3xl ${template.fontClass} mb-2">${heading}</h2>
                <div class="w-16 h-1 bg-white mx-auto rounded-full opacity-70 mb-2"></div>
            </div>
            
            <div class="flex flex-col items-center card-content w-full max-w-xs mx-auto">
                <div class="qr-container mb-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
                    <img src="${uploadedQrCode}" alt="QR Code" class="qr-code-img">
                </div>
                <p class="text-white text-base sm:text-lg mb-1">বিকাশে সালামি পাঠান</p>
                <p class="text-white text-base sm:text-lg font-bold">${bkashNumber}</p>
                <p class="text-white mt-2 opacity-90">${name}</p>
            </div>
            
            <div class="text-center mt-4 card-content w-full max-w-xs mx-auto">
                <p class="text-white text-xs sm:text-sm md:text-base opacity-90">${message}</p>
                <div class="mt-3 text-white text-xs opacity-70">
                    <p>ডিজিটাল ঈদ কার্ড | bKash Eid Card Generator</p>
                </div>
            </div>
        </div>
    `;
        
        cardPreview.innerHTML = cardHTML;
        cardActions.classList.remove('hidden');
        
        animateStars();
    });
    
    function generateStars(count) {
        let starsHTML = '';
        for (let i = 0; i < count; i++) {
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 2;
            
            starsHTML += `<div class="star" style="width: ${size}px; height: ${size}px; left: ${left}%; top: ${top}%; animation-delay: ${delay}s;"></div>`;
        }
        return starsHTML;
    }
    
    function animateStars() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
        });
    }
    
    downloadBtn.addEventListener('click', function() {
        const cardElement = document.querySelector('.card');
        
        const originalButtonText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';
        downloadBtn.disabled = true;
        
        setTimeout(() => {
            html2canvas(cardElement, {
                scale: 2,
                backgroundColor: null,
                logging: false,
                allowTaint: true,
                useCORS: true
            }).then(canvas => {
                const image = canvas.toDataURL('image/png');
                
                const link = document.createElement('a');
                link.href = image;
                link.download = 'bKash-Eid-Card.png';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                downloadBtn.innerHTML = originalButtonText;
                downloadBtn.disabled = false;
            }).catch(error => {
                console.error('Error generating image:', error);
                alert('দুঃখিত, ছবি তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                
                downloadBtn.innerHTML = originalButtonText;
                downloadBtn.disabled = false;
            });
        }, 100);
    });
    

    shareBtn.addEventListener('click', function() {
        if (!navigator.share) {
            alert('দুঃখিত, আপনার ব্রাউজারে শেয়ার ফাংশন সাপোর্টেড নয়। অনুগ্রহ করে স্ক্রিনশট তুলে মেসেঞ্জার বা ইমেইলে শেয়ার করুন।');
            return;
        }
        
        const cardElement = document.querySelector('.card');
        

        const originalButtonText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';
        shareBtn.disabled = true;
        
        setTimeout(() => {
            html2canvas(cardElement, {
                scale: 2,
                backgroundColor: null,
                logging: false,
                allowTaint: true,
                useCORS: true
            }).then(async canvas => {

                canvas.toBlob(async function(blob) {
                    try {
                        const file = new File([blob], 'bKash-Eid-Card.png', { type: 'image/png' });
                        
                        await navigator.share({
                            title: 'বিকাশ ঈদ কার্ড',
                            text: 'আমার ঈদের কার্ড দেখুন! বিকাশে সালামি পাঠান।',
                            files: [file]
                        });
                    } catch (error) {
                        console.error('Error sharing:', error);

                        if (error.toString().includes('files')) {
                            try {
                                await navigator.share({
                                    title: 'বিকাশ ঈদ কার্ড',
                                    text: 'আমার ঈদের কার্ড দেখুন! বিকাশে সালামি পাঠান।'
                                });
                            } catch (secondError) {
                                alert('শেয়ার করতে সমস্যা হয়েছে। অনুগ্রহ করে কার্ডটি ডাউনলোড করে শেয়ার করুন।');
                            }
                        } else {
                            alert('শেয়ার করতে সমস্যা হয়েছে। অনুগ্রহ করে কার্ডটি ডাউনলোড করে শেয়ার করুন।');
                        }
                    }

                    shareBtn.innerHTML = originalButtonText;
                    shareBtn.disabled = false;
                }, 'image/png');
            }).catch(error => {
                console.error('Error generating image for sharing:', error);
                alert('দুঃখিত, ছবি তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                shareBtn.innerHTML = originalButtonText;
                shareBtn.disabled = false;
            });
        }, 100);
    });

    function generateElementHTML(element, type) {
        if (type === 'moon') {
            return `<div class="moon absolute ${element.x} ${element.y} ${element.animation || ''}"></div>`;
        } else if (type === 'crescent') {
            return `<div class="crescent absolute ${element.x} ${element.y} ${element.animation || ''}"></div>`;
        } else if (type === 'lantern') {
            return `<div class="lantern absolute ${element.x} ${element.y} ${element.animation || ''}"></div>`;
        }
        return '';
    }
    
    // When adding elements to the card, replace this part of your code:
    // Add decorative elements
    template.elements.forEach(element => {
        if (element.type !== 'stars') {  // Handle stars separately
            cardHTML += generateElementHTML(element, element.type);
        }
    });
});
