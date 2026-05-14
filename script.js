// 页面加载后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 防止FOUC
    document.body.classList.add('js-loading');
    
    // 初始化粒子背景
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 45, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { value: "#00d9ff" },
                shape: { type: "circle" },
                opacity: { 
                    value: 0.4, 
                    random: true 
                },
                size: { 
                    value: 2.5, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 130,
                    color: "#00d9ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { 
                        enable: true, 
                        mode: "repulse",
                        distance: 100
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    }
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 23, 0.99)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 14, 23, 0.98)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 邮箱复制功能
    const emailButton = document.getElementById('emailButton');
    const toast = document.getElementById('toast');
    const emailAddress = 'admin@itboy.pw';
    let toastTimeout;
    
    emailButton.addEventListener('click', function() {
        // 复制到剪贴板
        navigator.clipboard.writeText(emailAddress).then(() => {
            showToast();
        }).catch(err => {
            // 备用方法
            const textArea = document.createElement('textarea');
            textArea.value = emailAddress;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast();
        });
        
        // 5秒后自动关闭
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            hideToast();
        }, 5000);
    });
    
    // 显示弹窗
    function showToast() {
        toast.classList.add('show');
        toast.setAttribute('aria-hidden', 'false');
        
        // 点击弹窗任意位置关闭
        toast.addEventListener('click', hideToast);
    }
    
    // 隐藏弹窗
    function hideToast() {
        toast.classList.remove('show');
        toast.setAttribute('aria-hidden', 'true');
        toast.removeEventListener('click', hideToast);
    }
    
    // 滚动动画
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始设置
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 初始检查和滚动监听
    setTimeout(checkScroll, 100);
    window.addEventListener('scroll', checkScroll);
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 移除加载类
    setTimeout(() => {
        document.body.classList.remove('js-loading');
    }, 100);
    
    // 增强SEO：添加结构化数据（JSON-LD）
    addStructuredData();
});

// 添加结构化数据函数
function addStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "itboy.pw",
        "url": "https://itboy.pw",
        "description": "IT技术爱好者的个人网站，记录从2015年开始的技术学习历程、前端开发、后端开发、项目实践经验",
        "author": {
            "@type": "Person",
            "name": "iT男孩",
            "email": "admin@itboy.pw"
        },
        "inLanguage": "zh-CN",
        "keywords": "IT技术,前端开发,后端开发,个人网站,学习记录,技术成长,Web开发",
        "dateCreated": "2015-01-01",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "域名含义",
                    "description": "解释itboy.pw域名各部分的含义"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "成长轨迹",
                    "description": "从2015年开始的技术学习历程记录"
                }
            ]
        }
    };
    
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);
}

// 性能优化：页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        // 页面不可见时暂停不必要的动画
        document.body.classList.add('page-hidden');
    } else {
        document.body.classList.remove('page-hidden');
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    // 可以在这里添加错误上报逻辑
}, true);

// 离线处理
window.addEventListener('offline', function() {
    console.log('网络已断开');
});

window.addEventListener('online', function() {
    console.log('网络已恢复');
});
