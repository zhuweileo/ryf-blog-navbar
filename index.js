// ==UserScript==
// @name         阮一峰网站导航
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  为阮一峰的网站添加页面导航功能
// @author       You
// @match        https://www.ruanyifeng.com/blog/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 等待页面加载完成
    window.addEventListener('load', function() {
        // 获取所有h2标签
        const h2Tags = document.querySelectorAll('h2');
        
        // 如果页面中没有h2标签，则不创建导航
        if (h2Tags.length === 0) return;
        
        // 创建导航容器
        const navContainer = document.createElement('div');
        navContainer.id = 'ruanyifeng-nav-container';
        navContainer.style.cssText = `
            position: fixed;
            right: 20px;
            top: 100px;
            width: 200px;
            max-height: 80vh;
            overflow-y: auto;
            background-color: rgba(255, 255, 255, 0.95);
            border-radius: 6px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            padding: 12px 10px;
            z-index: 9999;
            font-size: 14px;
            line-height: 1.4;
            border: 1px solid rgba(0, 0, 0, 0.05);
        `;
        
        // 创建导航标题
        const navTitle = document.createElement('div');
        navTitle.textContent = '页面导航';
        navTitle.style.cssText = `
            font-weight: bold;
            margin-bottom: 8px;
            padding-bottom: 5px;
            border-bottom: 1px solid #eee;
            text-align: center;
            font-size: 15px;
            color: #333;
        `;
        navContainer.appendChild(navTitle);
        
        // 创建导航列表
        const navList = document.createElement('ul');
        navList.style.cssText = `
            list-style: none;
            padding: 0;
            margin: 0;
        `;
        
        // 为每个h2标签创建导航项
        h2Tags.forEach((h2, index) => {
            // 为h2标签添加id，如果没有的话
            if (!h2.id) {
                h2.id = 'nav-heading-' + index;
            }
            
            const navItem = document.createElement('li');
            navItem.style.cssText = `
                margin-bottom: 4px;
                padding: 3px 0 3px 10px;
                border-left: 2px solid transparent;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 13px;
                line-height: 1.3;
                border-radius: 0 3px 3px 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `;
            
            navItem.textContent = h2.textContent;
            navItem.addEventListener('click', function() {
                h2.scrollIntoView({ behavior: 'smooth' });
            });
            
            // 鼠标悬停效果
            navItem.addEventListener('mouseover', function() {
                this.style.borderLeftColor = '#0066cc';
                this.style.backgroundColor = '#f0f8ff';
                this.style.paddingLeft = '12px';
            });
            
            navItem.addEventListener('mouseout', function() {
                this.style.borderLeftColor = 'transparent';
                this.style.backgroundColor = 'transparent';
                this.style.paddingLeft = '10px';
            });
            
            navList.appendChild(navItem);
        });
        
        navContainer.appendChild(navList);
        
        // 添加关闭按钮
        const closeButton = document.createElement('div');
        closeButton.textContent = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 5px;
            right: 10px;
            cursor: pointer;
            font-size: 18px;
            color: #999;
        `;
        closeButton.addEventListener('click', function() {
            navContainer.style.display = 'none';
            toggleButton.textContent = '导航';
        });
        navContainer.appendChild(closeButton);
        
        // 添加显示/隐藏按钮
        const toggleButton = document.createElement('div');
        toggleButton.textContent = '隐藏';
        toggleButton.style.cssText = `
            position: fixed;
            right: 20px;
            top: 50px;
            background-color: #0066cc;
            color: white;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            z-index: 9999;
            display: block;
        `;
        toggleButton.addEventListener('click', function() {
            if (navContainer.style.display === 'none') {
                navContainer.style.display = 'block';
                toggleButton.textContent = '隐藏';
            } else {
                navContainer.style.display = 'none';
                toggleButton.textContent = '导航';
            }
        });
        document.body.appendChild(toggleButton);
        
        // 将导航添加到页面
        document.body.appendChild(navContainer);
        
        // 监听滚动事件，高亮当前位置的导航项
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // 找到当前滚动位置对应的h2标签
            let currentHeadingIndex = -1;
            h2Tags.forEach((h2, index) => {
                if (h2.offsetTop <= scrollPosition + 100) {
                    currentHeadingIndex = index;
                }
            });
            
            // 高亮对应的导航项
            if (currentHeadingIndex >= 0) {
                const navItems = navList.querySelectorAll('li');
                navItems.forEach((item, index) => {
                    if (index === currentHeadingIndex) {
                        item.style.borderLeftColor = '#0066cc';
                        item.style.fontWeight = 'bold';
                        item.style.backgroundColor = '#f0f8ff';
                        item.style.paddingLeft = '12px';
                    } else {
                        item.style.borderLeftColor = 'transparent';
                        item.style.fontWeight = 'normal';
                        item.style.backgroundColor = 'transparent';
                        item.style.paddingLeft = '10px';
                    }
                });
            }
        });
    });
})();