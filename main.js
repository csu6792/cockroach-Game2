const RANDOM_NAMES_PREFIX = ['瘋狂', '無情', '快樂', '暴躁', '沉默', '傳說', '終極', '菜鳥', '天才', '神級'];
const RANDOM_NAMES_SUFFIX = ['殺手', '大師', '拖鞋', '玩家', '勇者', '報紙', '清潔工', '戰神', '路人', '小強'];
		
		// ==========================================
        // Audio System (音效合成器)
        // ==========================================
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        function resumeAudio() { if (audioCtx.state === 'suspended') audioCtx.resume(); }
        const playSound = {
            splat: () => { resumeAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='sine'; o.frequency.setValueAtTime(120,audioCtx.currentTime); o.frequency.exponentialRampToValueAtTime(40,audioCtx.currentTime+0.12); g.gain.setValueAtTime(0.3,audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.15); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+0.16); },
            thud: () => { resumeAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='triangle'; o.frequency.setValueAtTime(180,audioCtx.currentTime); o.frequency.exponentialRampToValueAtTime(60,audioCtx.currentTime+0.1); g.gain.setValueAtTime(0.2,audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.1); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+0.1); },
            eat: () => { resumeAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='triangle'; o.frequency.setValueAtTime(1200,audioCtx.currentTime); o.frequency.setValueAtTime(1500,audioCtx.currentTime+0.02); g.gain.setValueAtTime(0.05,audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.05); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+0.06); },
            swish: () => { resumeAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='triangle'; o.frequency.setValueAtTime(350,audioCtx.currentTime); o.frequency.exponentialRampToValueAtTime(800,audioCtx.currentTime+0.1); g.gain.setValueAtTime(0.08,audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.11); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+0.12); },
            boom: () => { resumeAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='sawtooth'; o.frequency.setValueAtTime(90,audioCtx.currentTime); o.frequency.exponentialRampToValueAtTime(10,audioCtx.currentTime+0.45); g.gain.setValueAtTime(0.4,audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.5); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+0.52); },
            damage: () => { resumeAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='sawtooth'; o.frequency.setValueAtTime(220,audioCtx.currentTime); o.frequency.linearRampToValueAtTime(110,audioCtx.currentTime+0.25); g.gain.setValueAtTime(0.15,audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.28); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+0.3); },
            success: () => { resumeAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='sine'; o.frequency.setValueAtTime(523.25,audioCtx.currentTime); o.frequency.setValueAtTime(659.25,audioCtx.currentTime+0.1); g.gain.setValueAtTime(0.1,audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.2); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+0.25); },
            combo: (l) => { resumeAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='square'; o.frequency.setValueAtTime(300+(l*50),audioCtx.currentTime); g.gain.setValueAtTime(0.05,audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.1); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+0.15); },
            levelup: () => { resumeAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='triangle'; o.frequency.setValueAtTime(440,audioCtx.currentTime); o.frequency.linearRampToValueAtTime(880,audioCtx.currentTime+0.3); g.gain.setValueAtTime(0.1,audioCtx.currentTime); g.gain.linearRampToValueAtTime(0,audioCtx.currentTime+1); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+1); },
            shieldOn: () => { resumeAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='sine'; o.frequency.setValueAtTime(600,audioCtx.currentTime); o.frequency.linearRampToValueAtTime(1200,audioCtx.currentTime+0.2); g.gain.setValueAtTime(0,audioCtx.currentTime); g.gain.linearRampToValueAtTime(0.15,audioCtx.currentTime+0.1); g.gain.linearRampToValueAtTime(0,audioCtx.currentTime+0.5); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+0.5); }
        };

        // ==========================================
        // Config & State
        // ==========================================
        const WEAPON_CONFIG = {
            slipper: { name: '藍色拖鞋', icon: 'fa-shoe-prints', color: 'text-blue-400', glow: 'rgba(59,130,246,0.8)', baseDmg: 1, baseRadius: 35, baseCd: 0, cdReduction: 0, baseCost: 0, upgradeBase: 10 },
            grandma_slipper: { name: '阿嬤紅拖', icon: 'fa-shoe-prints', color: 'text-red-500', glow: 'rgba(239,68,68,0.8)', baseDmg: 2, baseRadius: 60, baseCd: 0.5, cdReduction: 0.05, baseCost: 50, upgradeBase: 25 },
            newspaper: { name: '橫掃報紙', icon: 'fa-newspaper', color: 'text-gray-300', glow: 'rgba(229,231,235,0.8)', baseDmg: 1, baseRadius: 45, baseCd: 0.6, cdReduction: 0.04, baseCost: 120, upgradeBase: 40 },
            pesticide_bomb: { name: '化學毒霧', icon: 'fa-spray-can', color: 'text-emerald-400', glow: 'rgba(16,185,129,0.8)', baseDmg: 5, baseRadius: 110, baseCd: 3.0, cdReduction: 0.2, baseCost: 250, upgradeBase: 60 },
            golden_slipper: { name: '至尊黃金拖鞋', icon: 'fa-shoe-prints', color: 'text-yellow-400', glow: 'rgba(251,191,36,0.9)', baseDmg: 8, baseRadius: 50, baseCd: 0.16, cdReduction: 0.02, baseCost: 3000, upgradeBase: 150 }
        };
        const SCENE_CONFIG = {
            kitchen: { targetId: 'target-cake', bgId: 'scene-kitchen' },
            living: { targetId: 'target-cookie', bgId: 'scene-living' },
            dining: { targetId: 'target-chicken', bgId: 'scene-dining' }
        };

        const ROACH_TYPES = {
            normal: { name: '普通小強', desc: '最常見的品種，生命力低，移動速度一般。', iconColor: 'text-amber-800' },
            tank: { name: '裝甲巨蟑', desc: '體型龐大且外殼堅硬，需要多次打擊才能消滅，速度緩慢。', iconColor: 'text-zinc-600' },
            golden: { name: '黃金小強', desc: '極為罕見，移動速度飛快，擊殺可獲得大量金幣。', iconColor: 'text-yellow-400' },
            ninja: { name: '暗影忍者', desc: '【夜行種】只在夜間出現，速度極快且體型小巧難以捕捉。', iconColor: 'text-purple-600' }
        };

        // 稱號配置
        const TITLE_CONFIG = [
            { level: 1, name: '廚房見習生', color: 'from-zinc-400 to-zinc-500' },
            { level: 3, name: '拖鞋入門者', color: 'from-amber-500 to-amber-700' },
            { level: 5, name: '滅蟑新手', color: 'from-blue-400 to-cyan-400' },
            { level: 8, name: '敏捷除蟲員', color: 'from-teal-400 to-emerald-500' },
            { level: 12, name: '金牌拖鞋手', color: 'from-green-400 to-emerald-600' },
            { level: 16, name: '毒霧支配者', color: 'from-purple-400 to-indigo-500' },
            { level: 20, name: '極限除蟲家', color: 'from-pink-400 to-rose-500' },
            { level: 25, name: '帝國衛兵', color: 'from-yellow-400 to-amber-500' },
            { level: 30, name: '餐桌守護神', color: 'from-yellow-300 to-orange-500' },
            { level: 40, name: '暗影終結者', color: 'from-fuchsia-500 to-purple-600' },
            { level: 50, name: '傳說級滅蟑王', color: 'from-red-500 to-rose-600' },
            { level: 75, name: '小強終局夢魘', color: 'from-rose-600 to-red-800' },
            { level: 100, name: '大至尊神之拖', color: 'from-red-500 via-orange-400 to-yellow-300' },
            { id: 'gacha_mythic_title', name: '天使降臨', level: 999, color: 'from-yellow-300 via-amber-500 via-red-500 to-purple-600 tracking-widest drop-shadow-[0_2px_10px_rgba(245,158,11,0.9)]', source: 'gacha' },
            { id: 'neon_killer', name: '蟑螂終結者', level: 999, color: 'from-cyan-400 to-blue-500 text-shadow-neon', source: 'shop' },
            { id: 'gold_god', name: '黃金拖鞋神', level: 999, color: 'from-yellow-400 to-amber-200 animate-pulse', source: 'shop' }
		];

        const ITEM_CONFIG = {
            plastic_wrap: { name: '保鮮膜防護罩', icon: 'fa-box-archive', color: 'text-cyan-400', desc: '為目標物套上一層堅固的保鮮膜，5秒內無敵，不受啃食傷害。', cost: 30 }
        };

        // 新增：特惠外框特效商店配置
        const BORDER_CONFIG = {
            none: { name: '無特效外框', cost: 0, desc: '普通的簡約邊框樣式', type: 'none', class: '' },
            // 火焰動畫 (3種，最低1000)
            red_fire: { name: '烈焰紅 (紅焰)', cost: 1000, desc: '高熱火焰，在大廳閃耀灼熱烈火的光芒！', type: 'fire', class: 'border-red-fire' },
            blue_frost: { name: '極冰藍 (藍焰)', cost: 1500, desc: '酷寒極冰的湛藍色火焰特效', type: 'fire', class: 'border-blue-frost' },
            purple_demon: { name: '暗魔紫 (紫焰)', cost: 2000, desc: '幽暗深邃的魔神紫色火焰特效', type: 'fire', class: 'border-purple-demon' },
            // 彩虹炫彩火焰 (2種，最低10000)
            rainbow_nebula: { name: '星雲虹光 (炫彩)', cost: 10000, desc: '尊貴彩虹炫光火焰！頂級玩家的奢華首選', type: 'rainbow', class: 'border-rainbow-nebula' },
            aurora_cosmic: { name: '宇宙極光 (極光霓彩)', cost: 15000, desc: '極光般的緩慢極速霓虹漸變，唯美至極', type: 'rainbow', class: 'border-aurora-cosmic' },
            gacha_mythic_border: { 
                name: '虛空混沌·流光邊框', 
                cost: 0, 
                desc: '扭蛋機專屬神話大獎！', 
                type: 'mythic', 
                class: 'border-4 border-transparent bg-gradient-to-r from-purple-600 via-pink-500 via-red-500 to-yellow-500 bg-[length:400%_400%] shadow-[0_0_35px_rgba(236,72,153,0.8)]',
                source: 'gacha' // 標記來源為扭蛋，防呆與 UI 顯示用
            }
		};

        // ==========================================
// 🎰 扭蛋專屬：超華麗動態特效大獎定義
// ==========================================
const GACHA_PRIZES = {
    border: {
        id: 'gacha_mythic_border',
        name: '虛空混沌·流光邊框',
        // 核心：注入一整串瘋狂的 Tailwind 動態特效組合（流光漸層 + 霓虹外發光）
        className: 'border-4 border-transparent bg-gradient-to-r from-purple-600 via-pink-500 via-red-500 to-yellow-500 bg-[length:400%_400%] shadow-[0_0_35px_rgba(236,72,153,0.8)]'
    },
    title: {
        id: 'gacha_mythic_title',
        name: '天使降臨',
        // 核心：文字漸層流光 + 閃爍動畫 + 超強文字陰影
        className: 'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-500 via-red-500 to-purple-600 bg-[length:200%_auto] tracking-widest drop-shadow-[0_2px_10px_rgba(245,158,11,0.9)]'
    }
};
		
		// 新增商城稱號配置
		const TITLE_SHOP_CONFIG = {
			neon_killer: { id: 'neon_killer', name: '蟑螂終結者', cost: 10000, class: 'title-neon', desc: '閃耀霓虹光芒的尊貴稱號' },
			gold_god: { id: 'gold_god', name: '黃金拖鞋神', cost: 15000, class: 'title-gold-shine', desc: '極致奢華的流動金光稱號' }
		};

        let db = {
			username: localStorage.getItem('roach_username') || '', // 🌟 新增這行
            level: parseInt(localStorage.getItem('roach_level')) || 1,
            exp: parseInt(localStorage.getItem('roach_exp')) || 0,
            coins: parseInt(localStorage.getItem('roach_coins')) || 0,
            weapons: JSON.parse(localStorage.getItem('roach_weapons')) || ['slipper'],
            w_levels: JSON.parse(localStorage.getItem('roach_w_levels')) || { slipper: 1, grandma_slipper: 1, newspaper: 1, pesticide_bomb: 1, golden_slipper: 1 },
            scenes: JSON.parse(localStorage.getItem('roach_scenes')) || ['kitchen'],
            kills: JSON.parse(localStorage.getItem('roach_kills')) || { normal: 0, tank: 0, golden: 0, ninja: 0 },
            items: JSON.parse(localStorage.getItem('roach_items')) || { plastic_wrap: 0 },
            // 新增：特效外框數據庫
            unlocked_borders: JSON.parse(localStorage.getItem('roach_unlocked_borders')) || ['none'],
            equipped_border: localStorage.getItem('roach_equipped_border') || 'none',
            // 新增：稱號自選
            equipped_title: localStorage.getItem('roach_equipped_title') ||'',
			// 新增：特效稱號資料庫
			unlocked_shop_titles: JSON.parse(localStorage.getItem('roach_unlocked_shop_titles')) || [],
			equipped_shop_title: localStorage.getItem('roach_equipped_shop_title') || ''
        };

        // ==========================================
// ★ 加入這段：自動修復與補齊缺失的武器等級存檔
// ==========================================
Object.keys(WEAPON_CONFIG).forEach(w => {
    // 如果發現某個武器沒有等級紀錄，或是變成 NaN，就自動把它設回 1 等
    if (typeof db.w_levels[w] === 'undefined' || isNaN(db.w_levels[w]) || db.w_levels[w] === null) {
        db.w_levels[w] = 1;
    }
});


saveDB();

        let gameState = {
            active: false, mode: 'battle', scene: 'kitchen',
            score: 0, sessionCoins: 0, targetHp: 500,
            weapon: 'slipper', cooldowns: { slipper: 0, grandma_slipper: 0, newspaper: 0, pesticide_bomb: 0, golden_slipper: 0 },
            tool: 'food', combo: 0, lastKillTime: 0,
            time: 8 * 60,
            isNight: false, timeSpeed: 2,
            shieldActive: false, shieldEndTime: 0
        };

        // ... 貼在 let gameState = { ... }; 的正下方 ...

// ==========================================
// 🎰 扭蛋抽獎核心邏輯
// ==========================================
function playGacha() {
    // 1. 檢查金幣是否足夠
    if (db.coins < 1000) {
        alert("❌ 金幣不足 1000！大魔王在笑你窮，快去刷怪！");
        return;
    }

    // 2. 扣除 1000 金幣
    db.coins -= 1000;
    saveDB();
    if (typeof updateLobbyUI === 'function') updateLobbyUI();

    // 3. 取得所有 UI 控制元素
    const playBtn = document.getElementById('gacha-play-btn');
    const closeBtn = document.getElementById('gacha-close-btn');
    const previewState = document.getElementById('gacha-preview-state');
    const shakingState = document.getElementById('gacha-shaking-state');
    const rewardState = document.getElementById('gacha-reward-state');
    const rewardBox = document.getElementById('reward-display-box');
    const rewardRarity = document.getElementById('reward-rarity');
    const glowBg = document.getElementById('reward-glow-bg');

    // 4. 鎖定按鈕避免重複點擊，並隱藏原本的預覽與舊獎勵
    playBtn.disabled = true;
    closeBtn.disabled = true;
    playBtn.innerText = "⚡ 正在扭蛋中...";
    previewState.classList.add('hidden');
    rewardState.classList.add('hidden');
    rewardState.classList.add('scale-0'); // 重設開獎縮放動畫

    // 5. 進入狀態 2：顯示大扭蛋瘋狂搖晃動畫
    shakingState.classList.remove('hidden');

    // 🎵 播放遊戲內建碰撞或打怪等震撼音效 (增強抽獎爽感)
    if (typeof playSound !== 'undefined' && playSound.thud) {
        playSound.thud();
        setTimeout(() => playSound.thud(), 300);
        setTimeout(() => playSound.thud(), 600);
    }

    // 6. 核心機率計算（先在背景算好結果）
    const roll = Math.random();
    let prizeType = "normal"; // normal, border, title
    let prizeName = "";
    let prizeHtml = "";

    // 🌟 修正1：使用你系統原生的存檔變數，並給予正確的預設值
    if (!db.unlocked_borders) db.unlocked_borders = ['none'];
    if (!db.unlocked_shop_titles) db.unlocked_shop_titles = [];

    if (roll < 0.01) { 
        // 🏆 1% 機率：神話邊框
        prizeType = "mythic_border";
        // 🌟 修正2：改成比對 unlocked_borders
        if (!db.unlocked_borders.includes(GACHA_PRIZES.border.id)) {
            db.unlocked_borders.push(GACHA_PRIZES.border.id);
            prizeName = GACHA_PRIZES.border.name;
        } else {
            db.coins += 5000;
            prizeType = "duplicate";
            prizeName = `【重複補償】5,000 金幣`;
        }
    } else if (roll <0.02) { 
        // 🏆 1% 機率：神話稱號
        prizeType = "mythic_title";
        // 🌟 修正3：改成比對 unlocked_shop_titles
        if (!db.unlocked_shop_titles.includes(GACHA_PRIZES.title.id)) {
            db.unlocked_shop_titles.push(GACHA_PRIZES.title.id);
            prizeName = GACHA_PRIZES.title.name;
        } else {
            db.coins += 5000;
            prizeType = "duplicate";
            prizeName = `【重複補償】5,000 金幣`;
        }
    } else { 
        // 💩 安慰獎
        prizeType = "normal";
        db.exp += 100;
        prizeName = "經驗值 + 100";
        if (typeof checkLevelUp === 'function') checkLevelUp();
    }

    saveDB(); 

    // ==========================================
    // ⏳ 經典排程控制：搖晃 1.5 秒後，華麗爆炸開獎
    // ==========================================
    setTimeout(() => {
        // 隱藏搖晃狀態
        shakingState.classList.add('hidden');

        // 根據獎項類型，組裝最華麗的展示卡片 HTML
        if (prizeType === "mythic_border") {
            rewardRarity.innerText = "🌌【神話降臨 · 限定外框】🌌";
            rewardRarity.className = "text-sm font-black tracking-widest text-pink-400 animate-pulse";
            glowBg.className = "absolute inset-0 bg-pink-500/40 blur-3xl rounded-full animate-ping";
            prizeHtml = `
                <div class="w-56 bg-black border-4 border-transparent bg-gradient-to-r from-purple-600 via-pink-500 via-red-500 to-yellow-500 bg-[length:400%_400%] shadow-[0_0_35px_rgba(236,72,153,0.8)] p-4 rounded-2xl flex flex-col items-center justify-center animate-bounce">
                    <span class="text-white font-black text-sm text-center">${prizeName}</span>
                    <span class="text-[10px] text-zinc-400 mt-2">已解鎖！可至商城或自選區裝備</span>
                </div>
            `;
        } else if (prizeType === "mythic_title") {
            rewardRarity.innerText = "👑【天命覺醒 · 神話稱號】👑";
            rewardRarity.className = "text-sm font-black tracking-widest text-yellow-400 animate-pulse";
            glowBg.className = "absolute inset-0 bg-yellow-500/40 blur-3xl rounded-full animate-ping";
            prizeHtml = `
                <div class="w-56 bg-zinc-900 border border-yellow-500 p-4 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_25px_rgba(234,179,8,0.5)]">
                    <div class="${GACHA_PRIZES.title.className} text-sm text-center">${prizeName}</div>
                    <span class="text-[10px] text-zinc-400 mt-2">已解鎖！可至大廳編輯裝備</span>
                </div>
            `;
        } else if (prizeType === "duplicate") {
            rewardRarity.innerText = "✨【命運交織 · 金幣轉化】✨";
            rewardRarity.className = "text-xs font-black tracking-widest text-cyan-400";
            glowBg.className = "absolute inset-0 bg-cyan-500/20 blur-xl rounded-full";
            prizeHtml = `
                <div class="bg-zinc-900 border border-cyan-800 p-4 rounded-xl text-center">
                    <span class="text-xl">💰</span>
                    <div class="text-cyan-400 font-extrabold text-sm mt-1">${prizeName}</div>
                    <p class="text-[10px] text-zinc-500 mt-1">重複抽中神話大獎自動退還金幣</p>
                </div>
            `;
        } else {
            // 普通獎
            rewardRarity.innerText = "💨【銘謝惠顧 · 下次好運】💨";
            rewardRarity.className = "text-xs font-black tracking-widest text-zinc-500";
            glowBg.className = "absolute inset-0 bg-zinc-500/10 blur-md rounded-full";
            prizeHtml = `
                <div class="bg-zinc-900 border border-zinc-800 py-3 px-6 rounded-xl text-center">
                    <span class="text-2xl">🍃</span>
                    <div class="text-zinc-300 font-bold text-xs mt-1">${prizeName}</div>
                </div>
            `;
        }

        // 🎵 播放開獎爆發音效
        if (typeof playSound !== 'undefined' && playSound.splat) {
            playSound.splat();
        }

        // 7. 將內容塞入並播放 Scale 動畫切換成狀態 3
        rewardBox.innerHTML = prizeHtml;
        rewardState.classList.remove('hidden');
        setTimeout(() => {
            rewardState.classList.remove('scale-0');
            rewardState.classList.add('scale-100');
        }, 50);

        // 8. 恢復按鈕狀態，允許繼續抽或離開
        playBtn.disabled = false;
        closeBtn.disabled = false;
        playBtn.innerText = "🚀 再次啟動 (1000金幣)";
        
        // 更新大廳與商城所有的金幣及UI顯示
        if (typeof updateLobbyUI === 'function') updateLobbyUI();
        if (typeof updateShopCoinsDisplay === 'function') updateShopCoinsDisplay();

    }, 1500); // ⏱️ 1.5 秒的劇烈搖晃時間
}


// ==========================================
// BOSS 戰核心邏輯模組 (完美對接蛋糕與原本機制版)
// ==========================================
let isBossMode = false;
let bossHp = 100;
const bossMaxHp = 100;
let bossMoveInterval;
let bossAttackInterval;

// 1. 每秒檢查時間：決定左上角按鈕是否出現
// 1. 每秒檢查時間：決定左上角按鈕是否出現
function checkBossEvent() {
    const now = new Date();
    const mins = now.getMinutes();
    const banner = document.getElementById('boss-event-banner');
    const timerText = document.getElementById('boss-timer');

    // 🌟 終極判斷法：檢查大廳畫面是否顯示中
    const lobbyScreen = document.getElementById('lobby-screen');
    // 如果 lobbyScreen 存在，且「沒有」hidden 屬性，代表玩家現在正待在大廳
    const isInLobby = lobbyScreen && !lobbyScreen.classList.contains('hidden');

    // 條件：在 0~9 分鐘內，【而且玩家必須在大廳】，才顯示按鈕
    if (mins >= 0 && mins < 20 && isInLobby) { 
        if (banner) banner.classList.remove('hidden');
        const minsLeft = 19 - mins;
        const secsLeft = 59 - now.getSeconds();
        if (timerText) {
            timerText.innerText = `${minsLeft}:${secsLeft.toString().padStart(2, '0')}`;
        }
    } else {
        // 其他所有情況（時間沒到，或是玩家在 PVP/挑戰/生態箱/遊戲中），一律隱藏按鈕！
        if (banner) banner.classList.add('hidden');
    }
}
setInterval(checkBossEvent, 1000);
window.addEventListener('DOMContentLoaded', checkBossEvent);

// 2. 玩家點擊按鈕：啟動 BOSS 戰 (獨立關卡版)
function startBossMode() {
    isBossMode = true;
    
    // 隱藏大廳與入口按鈕
    const banner = document.getElementById('boss-event-banner');
    if (banner) banner.classList.add('hidden');
    const lobbyScreen = document.getElementById('lobby-screen');
    if (lobbyScreen) lobbyScreen.classList.add('hidden');
    
    // 顯示遊戲容器與上下工具列
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) gameContainer.classList.remove('hidden');
    document.getElementById('top-bar').classList.remove('hidden');
    document.getElementById('bottom-bar').classList.remove('hidden');
    
    // ==========================================
    // 🌟 獨立關卡核心：手動佈置戰場與蛋糕！
    // ==========================================
    const gameScreen = document.getElementById('game-screen') || gameContainer;
    
    // 1. (可選) 幫這個獨立關卡加一個較暗的紅色背景，增加魔王戰氣氛
    gameScreen.style.backgroundColor = '#2a1215'; 

    // 2. 憑空創造一塊「BOSS戰專用蛋糕」放在正中央
    let bossCake = document.getElementById('boss-cake-element');
    if (!bossCake) {
        bossCake = document.createElement('div');
        bossCake.id = 'boss-cake-element';
        // 用 Tailwind 讓蛋糕絕對置中，並加上一點發光特效
        bossCake.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-8xl md:text-[120px] select-none pointer-events-none drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]';
        bossCake.innerHTML = '🍰'; // 如果你有蛋糕的圖片，也可以改成 <img src="cake.png">
        gameScreen.appendChild(bossCake);
    }
    
    // 🔥 提升目標(蛋糕)血量 1.5 倍
    gameState.targetHp = 100; 
    updateTargetHpUI(); 

    // 觸發紅色 WARNING 警告特效
    const warning = document.getElementById('boss-warning-overlay');
    if (warning) {
        warning.innerHTML = `<div class="text-6xl md:text-8xl font-black text-red-600 tracking-widest drop-shadow-[0_0_30px_rgba(220,38,38,1)] animate-pulse" style="-webkit-text-stroke: 3px black;">WARNING</div>`;
        warning.classList.remove('hidden');
        setTimeout(() => warning.classList.add('hidden'), 2500);
    }

    // 滑出 BOSS 專屬頂部大血條 UI
    const bossUi = document.getElementById('boss-ui-container');
    if (bossUi) {
        bossUi.classList.remove('hidden');
        setTimeout(() => bossUi.classList.remove('-translate-y-20'), 100);
    }
    
    bossHp = bossMaxHp;
    updateBossHpBar();

    // 正式生成大蟑螂！
    spawnBossCockroach();
}
// 3. 更新 BOSS 頂部紅色大血條顯示
function updateBossHpBar() {
    const hpBar = document.getElementById('boss-hp-bar');
    const hpText = document.getElementById('boss-hp-text');
    if (hpBar && hpText) {
        const percent = Math.max(0, (bossHp / bossMaxHp) * 100);
        hpBar.style.width = `${percent}%`;
        hpText.innerText = `${bossHp} / ${bossMaxHp}`;
    }
}

// 4. 更新守護目標(蛋糕)左上角真正的血條
function updateTargetHpUI() {
    // 修正：對接你原本 HTML 裡的左上角食物血條 ID "#target-hp"
    const hpBar = document.getElementById('target-hp'); 
    if (hpBar) {
        // 因為最大血量在 BOSS 戰變成 150，計算百分比時要對應換算，避免血條破格
        let percent = isBossMode ? (gameState.targetHp / 150) * 100 : gameState.targetHp;
        hpBar.style.width = `${Math.max(0, percent)}%`;
        
        // 依照血量比例自動變色
        if (percent <= 30) {
            hpBar.style.backgroundColor = '#ef4444'; // 紅色
        } else if (percent <= 60) {
            hpBar.style.backgroundColor = '#eab308'; // 黃色
        } else {
            hpBar.style.backgroundColor = '#22c55e'; // 綠色
        }
    }
}

// 5. 動態生成 BOSS 與戰鬥(啃咬)邏輯
function spawnBossCockroach() {
    // 對接你原本放小強和蛋糕的遊戲主要面板
    const gameScreen = document.getElementById('game-screen') || document.getElementById('game-container');
    
    const boss = document.createElement('div');
    boss.id = 'boss-monster';
    // 🌟 修正 1：移除 transition-all 防止判定脫節，並加大點擊範圍 (w-48 h-48)
    boss.className = 'absolute z-[60] w-48 h-48 cursor-pointer select-none flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2';
    
    // 初始位置設定在畫面偏上方，露出中央的蛋糕
    boss.style.left = '35%';
    boss.style.top = '25%';
    
    // 裡面的紅色光圈一樣保留動畫，但不影響外層判定框
    boss.innerHTML = `
        <div class="w-40 h-40 flex items-center justify-center bg-red-950/30 rounded-full border-4 border-red-600 animate-bounce shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-transform duration-100">
            <i class="fa-solid fa-bug text-8xl text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.9)]"></i>
        </div>
    `;

    // 🌟 修正 2：升級為雙棲多點觸控 (取代原本的 click)
    function hitBoss(e) {
        // 阻止瀏覽器預設行為，讓手指可以像機關槍一樣狂戳
        if (e.type === 'touchstart') e.preventDefault(); 
        
        if (!isBossMode) return;
        
        // 播放合成音效
        if (typeof playSound !== 'undefined' && playSound.splat) playSound.splat();
        
        // 扣除 BOSS 血量
        bossHp -= 5; 
        updateBossHpBar();
        
        // 受擊小動畫 (加入 translate 確保縮放時不會亂跑)
        boss.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => boss.style.transform = 'translate(-50%, -50%) scale(1)', 100);

        // 🏆 勝利判定：BOSS 死亡
        if (bossHp <= 0) {
            clearInterval(bossMoveInterval);
            clearInterval(bossAttackInterval);
            alert("成功擊殺變異大蟑螂王！\n獲得 100 金幣！");
            
            // 獎勵發放
            db.coins += 100;
            saveDB();
            if (typeof updateLobbyUI === 'function') updateLobbyUI();
            
            // 清理戰場並回到大廳
            boss.remove();
            const cake = document.getElementById('boss-cake-element');
            if (cake) cake.remove(); 
            isBossMode = false;
            document.getElementById('boss-ui-container').classList.add('hidden');
            if (typeof backToLobby === 'function') backToLobby(); 
        }
    }

    // 將滑鼠與觸控同時綁定！
    boss.addEventListener('mousedown', hitBoss);
    boss.addEventListener('touchstart', hitBoss, { passive: false });

    gameScreen.appendChild(boss);

    // 【BOSS 機制 A】每 0.75 秒隨機瞬移亂跑 (避開正中央，讓玩家看得到蛋糕)
    bossMoveInterval = setInterval(() => {
        if (!isBossMode || !document.getElementById('boss-monster')) return;
        // 隨機在螢幕範圍內瞬移
        const randomX = Math.floor(Math.random() * 60) + 15;
        const randomY = Math.floor(Math.random() * 40) + 15;
        boss.style.left = `${randomX}%`;
        boss.style.top = `${randomY}%`;
    }, 200);

    // 【BOSS 機制 B】每 2.5 秒撲向中央狂咬蛋糕
    bossAttackInterval = setInterval(() => {
        if (!isBossMode || !document.getElementById('boss-monster')) return;
        
        // 瞬間衝向畫面正中央 (通常是蛋糕所在的地點)
        boss.style.left = '50%';
        boss.style.top = '50%';
        boss.style.transform = 'translate(-50%, -50%) scale(1.3)';
        
        if (typeof playSound !== 'undefined' && playSound.thud) playSound.thud();

        // 咬完後退回上方
        setTimeout(() => {
            boss.style.transform = 'scale(1)';
            boss.style.left = '50%';
            boss.style.top = '25%';
        }, 400);

        // 扣除蛋糕血量 (BOSS 咬一口扣 10 滴)
        gameState.targetHp -= 10;
        updateTargetHpUI(); // 即時重繪左上角血條
        
        // 畫面閃爍提示「蛋糕被咬了！」
        const warning = document.getElementById('boss-warning-overlay');
        if (warning) {
            warning.innerHTML = `<div class="text-4xl md:text-6xl font-black text-red-600 bg-black/60 px-6 py-2 rounded-2xl border-2 border-red-500">蛋糕被咬了！</div>`;
            warning.classList.remove('hidden');
            setTimeout(() => warning.classList.add('hidden'), 300);
        }

        // 💀 失敗判定：蛋糕血量歸零，直接對接你原本寫好的結束遊戲邏輯
        if (gameState.targetHp <= 0) {
            clearInterval(bossMoveInterval);
            clearInterval(bossAttackInterval);
            isBossMode = false;
            boss.remove();
            const cake = document.getElementById('boss-cake-element');
            if (cake) cake.remove();
			
            document.getElementById('boss-ui-container').classList.add('hidden');
            
            // 呼叫你原本第 570 行寫的 endGame 函數，完美產出結算與 Game Over 畫面
            if (typeof endGame === 'function') {
                endGame(); 
            } else {
                alert("💀 蛋糕被吃光了... Game Over！");
                backToLobby();
            }
        }
    }, 2500);
}

        // ==========================================
        // PVP State Variables
        // ==========================================
        let pvpState = {
            active: false,
            roomId: '',
            opponentId: '',
            myPlayerId: 'player_' + Math.random().toString(36).substr(2, 9),
            opponentHp: 100,
            pvpCoins: 0,
            pingTimer: null,
            lastOpponentHeartbeat: 0
        };
        //let client = null; // MQTT Client

        let roaches = [], crumbs = [], dragTarget = null;
        let lastSpawnTime = 0, spawnInterval = 1800;
        let width = window.innerWidth, height = window.innerHeight;
        let targetX = width/2, targetY = height/2;

        const svg = document.getElementById('game-canvas');
        const containers = { roaches: document.getElementById('roaches-container'), crumbs: document.getElementById('crumbs-container'), splats: document.getElementById('splatters-container'), waves: document.getElementById('waves-container') };

        // ==========================================
        // Resize & Positioning
        // ==========================================
        window.addEventListener('resize', () => {
            width = svg.clientWidth; height = svg.clientHeight;
            targetX = width / 2; targetY = height / 2;
            ['target-cake', 'target-cookie', 'target-chicken'].forEach(id => {
                const el = document.getElementById(id);
                if(el) el.setAttribute('transform', `translate(${targetX}, ${targetY})`);
            });
            const table = document.getElementById('living-table');
            if(table) { table.setAttribute('width', `${width*0.8}`); table.setAttribute('height', `${height*0.6}`); table.setAttribute('x', `${width*0.1}`); table.setAttribute('y', `${height*0.2}`); }
            
            const plate = document.getElementById('dining-plate');
            const plateInner = document.getElementById('dining-plate-inner');
            const plateShadow = document.getElementById('dining-plate-shadow');
            if(plate) { plate.setAttribute('cx', targetX); plate.setAttribute('cy', targetY); }
            if(plateInner) { plateInner.setAttribute('cx', targetX); plateInner.setAttribute('cy', targetY); }
            if(plateShadow) { plateShadow.setAttribute('cx', targetX+5); plateShadow.setAttribute('cy', targetY+10); }
        });

        // ==========================================
        // Save & Leveling & Titles
        // ==========================================
        function saveDB() {
			localStorage.setItem('roach_username', db.username); // 🌟 新增這行
            localStorage.setItem('roach_level', db.level); localStorage.setItem('roach_exp', db.exp);
            localStorage.setItem('roach_coins', db.coins); localStorage.setItem('roach_weapons', JSON.stringify(db.weapons));
            localStorage.setItem('roach_w_levels', JSON.stringify(db.w_levels)); localStorage.setItem('roach_scenes', JSON.stringify(db.scenes));
            localStorage.setItem('roach_kills', JSON.stringify(db.kills));
            localStorage.setItem('roach_items', JSON.stringify(db.items));
            // 特效外框儲存
            localStorage.setItem('roach_unlocked_borders', JSON.stringify(db.unlocked_borders));
            localStorage.setItem('roach_equipped_border', db.equipped_border);
            // 稱號儲存
            localStorage.setItem('roach_equipped_title', db.equipped_title);
			
			// 新增：特效稱號儲存
			localStorage.setItem('roach_unlocked_shop_titles', JSON.stringify(db.unlocked_shop_titles));
			localStorage.setItem('roach_equipped_shop_title', db.equipped_shop_title);
            updateLobbyUI();
        }
		
		// 打開統一商城
		function openUnifiedShop() {
			
			closeModals(); // 關閉其他彈窗
			switchBGM(shopBgm); // 🌟 切換成商城音樂
			document.getElementById('unified-shop-modal').classList.remove('hidden');
			updateShopCoinsDisplay(); // 更新金幣顯示
			
			// 同時渲染兩邊的資料
			renderBorderShop(); // 原本的邊框渲染函數
			renderTitleShop();  // 剛剛寫的稱號渲染函數
			
			// 預設切換到外框分頁
			switchShopTab('border'); 
		}

		// 切換商城分頁邏輯
		function switchShopTab(tabName) {
			const btnBorder = document.getElementById('tab-btn-border');
			const btnTitle = document.getElementById('tab-btn-title');
			const listBorder = document.getElementById('border-item-list');
			const listTitle = document.getElementById('title-item-list');
			const shopDesc = document.getElementById('shop-desc');

			// 啟用的按鈕樣式
			const activeBtnClass = "flex-1 py-2 rounded-lg text-sm font-bold bg-zinc-700 text-white transition-colors shadow-sm";
			// 未啟用的按鈕樣式
			const inactiveBtnClass = "flex-1 py-2 rounded-lg text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-colors";

			if (tabName === 'border') {
				btnBorder.className = activeBtnClass;
				btnTitle.className = inactiveBtnClass;
				listBorder.classList.remove('hidden');
				listTitle.classList.add('hidden');
				shopDesc.textContent = "購買並配置動態流光外框特效，彰顯大師品味！";
			} else {
				btnTitle.className = activeBtnClass;
				btnBorder.className = inactiveBtnClass;
				listTitle.classList.remove('hidden');
				listBorder.classList.add('hidden');
				shopDesc.textContent = "購買並裝備酷炫的動畫特效稱號，展現尊貴身分！";
			}
		}

		// 獨立寫一個更新金幣的函數，方便購買後呼叫
		function updateShopCoinsDisplay() {
			const coinDisplay = document.getElementById('c-shop-coins-display');
			if (coinDisplay) {
				coinDisplay.textContent = db.coins;
			}
		}

        function getTitleForLevel(level) {
            let currentTitle = TITLE_CONFIG[0];
            for (let i = TITLE_CONFIG.length - 1; i >= 0; i--) {
                if (level >= TITLE_CONFIG[i].level) {
                    currentTitle = TITLE_CONFIG[i];
                    break;
                }
            }
            return currentTitle;
        }
		
		function buyShopTitle(titleId) {
			const titleItem = TITLE_SHOP_CONFIG[titleId];
			if (!titleItem) return;

			if (db.unlocked_shop_titles.includes(titleId)) {
				alert("已經擁有此稱號！");
				return;
			}

			if (db.coins >= titleItem.cost) {
				db.coins -= titleItem.cost;
				db.unlocked_shop_titles.push(titleId);
				db.equipped_shop_title = titleId; // 買完自動裝備
				
				saveDB(); // 存檔
				
				// 更新 UI 介面
				updateShopCoinsDisplay(); // 更新商城金幣顯示
				renderTitleShop();        // 重新渲染稱號列表(讓按鈕變成"使用中")
				updateLobbyUI();          // 更新大廳的稱號顯示
				
				if(typeof playSound !== 'undefined' && playSound.success) playSound.success();
			} else {
				alert("金幣不足！");
			}
		}
		
		// 渲染稱號商城內容
		function renderTitleShop() {
			const listEl = document.getElementById('title-item-list');
			if (!listEl) return;
			
			listEl.innerHTML = ''; // 清空列表

			// 確保有找到設定檔
			if (typeof TITLE_SHOP_CONFIG === 'undefined') {
				console.error("找不到 TITLE_SHOP_CONFIG，請確認是否已經宣告設定檔");
				return;
			}

			Object.keys(TITLE_SHOP_CONFIG).forEach(id => {
				const item = TITLE_SHOP_CONFIG[id];
				const isUnlocked = db.unlocked_shop_titles.includes(id);
				const isEquipped = db.equipped_shop_title === id;

				// 判斷按鈕狀態：已裝備、已擁有、未擁有(顯示價格)
				let btnHtml = '';
				if (isEquipped) {
					btnHtml = `<button disabled class="bg-zinc-700 text-zinc-400 px-3 py-1.5 rounded-lg font-bold text-sm cursor-not-allowed border border-zinc-600">使用中</button>`;
				} else if (isUnlocked) {
					btnHtml = `<button onclick="equipShopTitle('${id}')" class="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-[0_0_10px_rgba(8,145,178,0.3)] transition-transform hover:scale-105">裝備</button>`;
				} else {
					const canAfford = db.coins >= item.cost;
					btnHtml = `<button onclick="buyShopTitle('${id}')" class="${canAfford ? 'bg-yellow-500 hover:bg-yellow-400 text-black' : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'} px-3 py-1.5 rounded-lg font-bold text-sm transition-transform ${canAfford ? 'hover:scale-105 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : ''}">
						<i class="fa-solid fa-coins"></i> ${item.cost}
					</button>`;
				}

				const div = document.createElement('div');
				div.className = `bg-zinc-800/80 p-3 rounded-xl border ${isEquipped ? 'border-cyan-500' : 'border-zinc-700'} flex justify-between items-center transition hover:border-zinc-600`;
				div.innerHTML = `
					<div>
						<div class="text-lg font-bold ${item.class}">${item.name}</div>
						<div class="text-xs text-zinc-400 mt-1">${item.desc}</div>
					</div>
					<div>${btnHtml}</div>
				`;
				listEl.appendChild(div);
			});
		}
		
		// 供玩家從背包/稱號選單裝備已購買的特效稱號
		function equipShopTitle(titleId) {
			if (db.unlocked_shop_titles.includes(titleId)) {
				db.equipped_shop_title = titleId;
				saveDB();
				
				// 更新 UI 介面
				renderTitleShop(); 
				updateLobbyUI();
			}
		}

        // 當前獲得/佩戴稱號邏輯：優先自選，其次最大等級解鎖
        function getEquippedTitle() {
            if (db.equipped_title) {
                // 檢查是否仍然符合解鎖資格 (避免重置或作弊)
                const conf = TITLE_CONFIG.find(t => t.name === db.equipped_title);
                if (conf && db.level >= conf.level) {
                    return conf;
                }
            }
            return getTitleForLevel(db.level);
        }

        function getExpNeeded(lvl) { return lvl * 100; }
        function addExp(amount) {
            db.exp += amount; let needed = getExpNeeded(db.level); let leveledUp = false;
            let oldLevel = db.level;
            
            while(db.exp >= needed) { db.exp -= needed; db.level++; leveledUp = true; needed = getExpNeeded(db.level); }
            
            if (leveledUp) {
                playSound.levelup();
                const banner = document.getElementById('level-up-banner'); 
                document.getElementById('level-up-number').textContent = db.level;
                
                const oldTitle = getTitleForLevel(oldLevel);
                const newTitle = getTitleForLevel(db.level);
                
                banner.classList.remove('hidden'); 
                setTimeout(() => banner.classList.add('hidden'), 3500);
            }
            saveDB();
        }

        // ==========================================
        // Time & Day/Night System
        // ==========================================
        function updateTime(dt) {
            if(!gameState.active) return;
            gameState.time += (dt / 1000) * gameState.timeSpeed;
            if(gameState.time >= 1440) gameState.time -= 1440;
            
            const hours = Math.floor(gameState.time / 60);
            const mins = Math.floor(gameState.time % 60);
            const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
            
            document.getElementById('game-time-display').textContent = timeStr;
            document.getElementById('lobby-time-display').innerHTML = gameState.isNight ? `<i class="fa-solid fa-moon mr-1 text-purple-400"></i>${timeStr}` : `<i class="fa-regular fa-sun mr-1 text-yellow-400"></i>${timeStr}`;

            const wasNight = gameState.isNight;
            gameState.isNight = (hours >= 18 || hours < 6);

            if(wasNight !== gameState.isNight) {
                const container = document.getElementById('game-container');
                const icon = document.getElementById('time-icon');
                const warning = document.getElementById('night-warning');
                
                if(gameState.isNight) {
                    container.classList.replace('is-day', 'is-night');
                    icon.className = 'fa-solid fa-moon text-purple-400 text-sm transition-colors duration-1000';
                    warning.classList.remove('hidden');
                } else {
                    container.classList.replace('is-night', 'is-day');
                    icon.className = 'fa-regular fa-sun text-yellow-400 text-sm transition-colors duration-1000';
                    warning.classList.add('hidden');
                }
            }
        }

        // ==========================================
        // Combo System & Gold Accumulation
        // ==========================================
        function registerKillCombo(now, type) {
            db.kills[type]++;
            
            const timeSinceLast = now - gameState.lastKillTime;
            if (timeSinceLast < 1500) { gameState.combo++; } else { gameState.combo = 1; }
            gameState.lastKillTime = now;
            
            let baseExp = 10, baseCoin = 1;
            if(type === 'golden') { baseExp = 50; baseCoin = 5; }
            if(type === 'tank') { baseExp = 20; baseCoin = 2; }
            if(type === 'ninja') { baseExp = 30; baseCoin = 3; }
            
            if(gameState.isNight) { baseExp = Math.ceil(baseExp * 1.5); baseCoin = Math.ceil(baseCoin * 1.5); }

            const comboMultiplier = 1 + (gameState.combo * 0.1);
            const finalExp = Math.ceil(baseExp * comboMultiplier);
            const finalCoin = Math.ceil(baseCoin * comboMultiplier);
            const finalScore = (type==='normal'?10:type==='tank'?20:type==='golden'?50:30) + (gameState.combo * 2);

            gameState.score += finalScore; gameState.sessionCoins += finalCoin; db.coins += finalCoin;
            addExp(finalExp);

            // PVP 對戰幣獲得機制
            if (pvpState.active) {
                let addPvpCoins = 10;
                if (type === 'golden') addPvpCoins = 50;
                else if (type === 'tank') addPvpCoins = 25;
                else if (type === 'ninja') addPvpCoins = 35;
                addPvpCoins = Math.ceil(addPvpCoins * comboMultiplier);
                pvpState.pvpCoins += addPvpCoins;
                updatePvpCoinsUI();
            }

            if (gameState.combo > 1) {
                playSound.combo(Math.min(gameState.combo, 10));
                const comboUI = document.getElementById('combo-display');
                document.getElementById('combo-count').textContent = gameState.combo;
                comboUI.classList.remove('hidden'); comboUI.classList.remove('combo-pulse');
                void comboUI.offsetWidth; comboUI.classList.add('combo-pulse');
            }
            return { coins: finalCoin };
        }

        // ==========================================
        // UI Navigation & Modals
        // ==========================================
        function updateLobbyUI() {
			checkPlayerName(); // 🌟 新增：只要更新大廳，就確保玩家有名字
    document.getElementById('lobby-level').textContent = db.level;
    document.getElementById('lobby-coins').textContent = db.coins;
    document.getElementById('shop-coins-display').textContent = db.coins;
    document.getElementById('item-shop-coins-display').textContent = db.coins;
    
    const needed = getExpNeeded(db.level);
    document.getElementById('lobby-exp-bar').style.width = `${(db.exp/needed)*100}%`;
    document.getElementById('lobby-exp-text').textContent = `${db.exp}/${needed}`;
    
    // ==========================================
    // 🌟 稱號獲取 (整合免費、商城、神話扭蛋)
    // ==========================================
    // ⚠️ 注意：ID 已經改成我們剛剛在 HTML 設定的 player-title-display
    const titleEl = document.getElementById('player-title-display'); 
    
    if (titleEl) {
        // 判斷優先級：1. 扭蛋神話稱號 -> 2. 商城特效稱號 -> 3. 免費等級稱號
        
        // (為了相容你的變數，這裡同時檢查 db.equippedTitle 與 db.equipped_shop_title)
        if (db.equippedTitle === GACHA_PRIZES.title.id || db.equipped_shop_title === GACHA_PRIZES.title.id) {
            // 🏆 顯示：神話扭蛋大獎特效
            titleEl.innerHTML = `${GACHA_PRIZES.title.name} <i class="fa-solid fa-pen-to-square text-[10px] text-zinc-400 opacity-60"></i>`;
            titleEl.className = `text-sm font-bold drop-shadow-sm mb-1 cursor-pointer hover:scale-105 transition-all inline-flex items-center gap-1 ${GACHA_PRIZES.title.className}`;
            
        } else if (db.equipped_shop_title && TITLE_SHOP_CONFIG[db.equipped_shop_title]) {
            // 🛒 顯示：商城的特效稱號
            const shopTitle = TITLE_SHOP_CONFIG[db.equipped_shop_title];
            titleEl.innerHTML = `${shopTitle.name} <i class="fa-solid fa-pen-to-square text-[10px] text-zinc-400 opacity-60"></i>`;
            titleEl.className = `text-sm font-bold drop-shadow-sm mb-1 cursor-pointer hover:scale-105 transition-all inline-flex items-center gap-1 ${shopTitle.class}`;
            
        } else {
            // 🆓 顯示：原有的免費等級稱號
            const titleInfo = getEquippedTitle();
            titleEl.innerHTML = `${titleInfo.name} <i class="fa-solid fa-pen-to-square text-[10px] text-zinc-400 opacity-60"></i>`;
            titleEl.className = `text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${titleInfo.color} drop-shadow-sm mb-1 cursor-pointer hover:scale-105 transition-all inline-flex items-center gap-1`;
        }
    }

    let unlockedDex = 0; 
    Object.values(db.kills).forEach(k => { if(k>0) unlockedDex++; });
    document.getElementById('dex-progress').textContent = `${unlockedDex}/4`;

    // ==========================================
    // 🌟 更新大廳角色卡邊框 (整合原有與神話外框)
    // ==========================================
    // ⚠️ 注意：ID 已經改成我們剛剛在 HTML 設定的 player-profile-card
    const playerCard = document.getElementById('player-profile-card'); 
    
    if (playerCard) {
        // 重置為預設外框，清除所有動畫 class
        playerCard.className = "bg-black/60 border rounded-2xl p-4 w-full mb-4 shadow-2xl backdrop-blur-sm relative transition-all duration-300";
        
        // 抓取目前的邊框 (相容你的變數名)
        const currentBorder = db.equipped_border || db.equippedBorder || 'none';
        
        // 判斷優先級：1. 神話扭蛋邊框 -> 2. 商城邊框 -> 3. 無邊框
        if (currentBorder === GACHA_PRIZES.border.id) {
            // 🏆 顯示：神話扭蛋邊框特效 (直接疊加 class)
            playerCard.className += ` ${GACHA_PRIZES.border.className}`;
            
        } else if (currentBorder !== 'none' && BORDER_CONFIG && BORDER_CONFIG[currentBorder]) {
            // 🛒 顯示：商城購買的邊框
            playerCard.classList.add(BORDER_CONFIG[currentBorder].class);
            
        } else {
            // 🆓 顯示：預設無邊框
            playerCard.classList.add('border-zinc-700');
        }
    }
}

        function openSceneSelect(mode) {
            playSound.success(); gameState.mode = mode; document.getElementById('scene-modal').classList.remove('hidden');
            ['living', 'dining'].forEach(scene => {
                if(db.scenes.includes(scene)) {
                    document.getElementById(`scene-btn-${scene}`).classList.replace('border-zinc-700', 'border-zinc-500');
                    document.getElementById(`scene-lock-${scene}`).classList.add('hidden');
                    document.getElementById(`scene-unlocked-${scene}`).classList.remove('hidden');
                }
            });
        }

        function selectScene(sceneId) {
            const costs = { living: 800, dining: 2500 };
            if (sceneId !== 'kitchen' && !db.scenes.includes(sceneId)) {
                if (db.coins >= costs[sceneId]) {
                    db.coins -= costs[sceneId]; db.scenes.push(sceneId); saveDB(); playSound.success(); openSceneSelect(gameState.mode);
                } else { playSound.damage(); alert('金幣不足解鎖場景！'); }
                return;
            }
            closeModals();
            document.getElementById('lobby-screen').classList.add('hidden'); document.getElementById('game-container').classList.remove('hidden');
            document.getElementById('top-bar').classList.remove('hidden'); document.getElementById('bottom-bar').classList.remove('hidden');
            
            gameState.scene = sceneId;
            Object.values(SCENE_CONFIG).forEach(c => document.getElementById(c.bgId).classList.add('scene-hidden'));
            document.getElementById(SCENE_CONFIG[sceneId].bgId).classList.remove('scene-hidden');
            
            if(gameState.mode === 'battle') {
                document.getElementById('battle-stats').classList.remove('hidden');
                document.getElementById('battle-panels').classList.remove('hidden'); document.getElementById('battle-panels').classList.add('flex');
                document.getElementById('sandbox-stats').classList.add('hidden');
                document.getElementById('sandbox-tools').classList.add('hidden'); document.getElementById('sandbox-tools').classList.remove('flex');
                document.getElementById(SCENE_CONFIG[sceneId].targetId).style.display = 'block';
                startGameSession();
            } else {
                document.getElementById('battle-stats').classList.add('hidden');
                document.getElementById('battle-panels').classList.add('hidden'); document.getElementById('battle-panels').classList.remove('flex');
                document.getElementById('sandbox-stats').classList.remove('hidden'); document.getElementById('sandbox-stats').classList.add('flex');
                document.getElementById('sandbox-tools').classList.remove('hidden'); document.getElementById('sandbox-tools').classList.add('flex');
                document.getElementById(SCENE_CONFIG[sceneId].targetId).style.display = 'none';
                startSandboxSession();
            }
            window.dispatchEvent(new Event('resize'));
        }

       function backToLobby() {
    playSound.success(); 
    gameState.active = false;
    
    document.getElementById('lobby-screen').classList.remove('hidden'); 
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('top-bar').classList.add('hidden'); 
    document.getElementById('bottom-bar').classList.add('hidden');
    document.getElementById('game-over-modal').classList.add('hidden'); 
    document.getElementById('combo-display').classList.add('hidden');
    
    // Clean up PvP parameters
    document.getElementById('pvp-stats').classList.add('hidden');
    document.getElementById('pvp-traps-panel').classList.add('hidden');
    document.getElementById('pvp-blind-overlay').classList.add('hidden');
    document.getElementById('pvp-trap-notification').classList.add('hidden');
    document.getElementById('pvp-end-modal').classList.add('hidden');
    document.getElementById('pvp-status-box').classList.add('hidden');
    resetPvPConnectBtn();

    pvpState.active = false;

    // 🚨 【核心修正】不掐斷大廳連線，只退訂特定的 PvP 對戰房，並在回大廳時立刻補發心跳
    if (client && client.connected) {
        // 如果原本有對戰房間號，只取消訂閱該房間，不影響大廳
        if (pvpState.roomId) {
            client.unsubscribe(`roach_pvp/room_${pvpState.roomId}`);
        }

        // 🌟 貼心加強：回大廳時立刻抓取正確稱號並廣播一次，讓名單秒刷新
        if (typeof PRESENCE_TOPIC !== 'undefined') {
            let currentTitleName = '無稱號';
            let currentTitleColor = 'from-zinc-400 to-zinc-500';
            
            if (typeof TITLE_CONFIG !== 'undefined') {
                let myTitleObj = null;
                if (db.equipped_title) {
                    myTitleObj = TITLE_CONFIG.find(t => t.name === db.equipped_title || t.id === db.equipped_title);
                } else if (db.equipped_shop_title) {
                    myTitleObj = TITLE_CONFIG.find(t => t.id === db.equipped_shop_title);
                }
                if (!myTitleObj) {
                    for (let i = TITLE_CONFIG.length - 1; i >= 0; i--) {
                        if (TITLE_CONFIG[i].level <= 100 && db.level >= TITLE_CONFIG[i].level) {
                            myTitleObj = TITLE_CONFIG[i];
                            break;
                        }
                    }
                }
                if (myTitleObj) {
                    currentTitleName = myTitleObj.name;
                    currentTitleColor = myTitleObj.color;
                }
            }

            // 立刻廣播自己回歸大廳了
            client.publish(PRESENCE_TOPIC, JSON.stringify({
                id: pvpState.myPlayerId,
                name: db.username,
                level: db.level || 1,
                titleName: currentTitleName,
                titleColor: currentTitleColor
            }));
        }
    } else {
        // 防呆：如果 client 真的因為意外徹底斷線了，回大廳時自動幫他重新連上
        if (typeof initMQTT === 'function') initMQTT();
    }

    // 清空房號與對手變數
    pvpState.roomId = '';
    pvpState.opponentId = '';

    // 關閉戰鬥中的 Ping 定時器
    if (pvpState.pingTimer) { 
        clearInterval(pvpState.pingTimer); 
        pvpState.pingTimer = null; 
    }

    // 🕒 保留你原本的時間渲染邏輯
    const hours = Math.floor(gameState.time / 60); 
    const mins = Math.floor(gameState.time % 60);
    const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    document.getElementById('lobby-time-display').innerHTML = gameState.isNight 
        ? `<i class="fa-solid fa-moon mr-1 text-purple-400"></i>${timeStr}` 
        : `<i class="fa-regular fa-sun mr-1 text-yellow-400"></i>${timeStr}`;
    
    // 🧹 保留原本的清理與儲存邏輯
    clearEntities(); 
    updateLobbyUI(); 
    saveDB();
}

        function closeModals() {
			if (typeof switchBGM === 'function' && typeof bgm !== 'undefined') {
        switchBGM(bgm); 
    }
            ['scene-modal', 'weapon-modal', 'dex-modal', 'item-modal', 'pvp-modal', 'unified-shop-modal', 'title-select-modal'].forEach(id => document.getElementById(id).classList.add('hidden')); 
        }

        // ==========================================
        // 新增功能：外框商城系統邏輯
        // ==========================================
        function openBorderShop() {
            playSound.success();
            document.getElementById('border-shop-modal').classList.remove('hidden');
            renderBorderShop();
        }

        function renderBorderShop() {
            const list = document.getElementById('border-item-list');
            list.innerHTML = '';
            const coinDisplay = document.getElementById('shop-coins-display');
			if (coinDisplay) {
				coinDisplay.textContent = db.coins;
			}

            Object.keys(BORDER_CONFIG).forEach(key => {
				
                const conf = BORDER_CONFIG[key];
				if (conf.source === 'gacha' || key === 'none') {
                return; // 在 forEach 裡面寫 return，等同於直接跳過這一個，繼續換下一個商品
                }
                const isUnlocked = db.unlocked_borders.includes(key);
                const isEquipped = db.equipped_border === key;

                let actionHtml = '';
                if (isEquipped) {
                    actionHtml = `<span class="bg-purple-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs whitespace-nowrap"><i class="fa-solid fa-circle-check mr-1"></i>配置中</span>`;
                } else if (isUnlocked) {
                    actionHtml = `<button onclick="equipBorder('${key}')" class="bg-zinc-800 hover:bg-zinc-700 text-purple-300 font-bold px-3 py-1.5 rounded-lg border border-zinc-600 text-xs whitespace-nowrap">使用外框</button>`;
                } else {
                    actionHtml = `<button onclick="buyBorder('${key}')" class="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-black px-3 py-1.5 rounded-lg text-xs whitespace-nowrap flex items-center gap-1 shadow-md">
                        <i class="fa-solid fa-coins"></i> ${conf.cost}
                    </button>`;
                }

                // 預覽樣式
                let borderPreviewStyle = `border border-zinc-700`;
                if (conf.class) {
                    borderPreviewStyle = conf.class;
                }

                // 分類小標籤
                let typeBadge = '';
                if (conf.type === 'fire') {
                    typeBadge = `<span class="text-[9px] bg-red-950 text-red-400 px-1.5 py-0.5 rounded border border-red-900/50">火焰特效</span>`;
                } else if (conf.type === 'rainbow') {
                    typeBadge = `<span class="text-[9px] bg-purple-950 text-purple-400 px-1.5 py-0.5 rounded border border-purple-900/50 animate-pulse">高級彩虹火焰</span>`;
                } else {
                    typeBadge = `<span class="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">無特效</span>`;
                }

                list.innerHTML += `
                    <div class="bg-zinc-800/80 rounded-xl p-3 border border-zinc-700/50 flex items-center gap-3 transition hover:border-zinc-600">
                        <!-- 預覽框 -->
                        <div class="w-12 h-12 rounded-lg bg-zinc-950 flex items-center justify-center flex-shrink-0 ${borderPreviewStyle}">
                            <i class="fa-solid fa-user-tie text-lg ${conf.type === 'rainbow' ? 'text-purple-400' : 'text-zinc-500'}"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-bold text-white text-sm flex items-center gap-2 truncate">
                                ${conf.name}
                                ${typeBadge}
                            </div>
                            <div class="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">${conf.desc}</div>
                        </div>
                        <div>${actionHtml}</div>
                    </div>
                `;
            });
        }

        function buyBorder(key) {
            const conf = BORDER_CONFIG[key];
            if (!conf) return;
            if (db.coins >= conf.cost) {
                db.coins -= conf.cost;
                db.unlocked_borders.push(key);
                db.equipped_border = key; // 購買後自動裝備
                saveDB();
				updateShopCoinsDisplay();
                playSound.success();
                renderBorderShop();
            } else {
                playSound.damage();
                alert(`金幣不足！需要 ${conf.cost} 金幣。`);
            }
        }

        function equipBorder(key) {
            if (db.unlocked_borders.includes(key)) {
                db.equipped_border = key;
                saveDB();
                playSound.success();
                renderBorderShop();
            }
        }

        // ==========================================
        // 新增功能：稱號自選管理邏輯
        // ==========================================
        function openTitleSelect() {
            playSound.success();
            document.getElementById('title-select-modal').classList.remove('hidden');
            renderTitleSelect();
        }

   // =========================================
// 🏆 稱號判定核心邏輯
// =========================================

// 取得當前配戴的稱號 (優先級：商城/扭蛋 > 手動配戴的普通稱號 > 等級自動解鎖)
function getEquippedTitle() {
    // 🌟 1. 最高優先級：如果有裝備「扭蛋/商城」的特殊稱號，直接回傳
    if (db.equipped_shop_title) {
        const specialConf = TITLE_CONFIG.find(t => t.id === db.equipped_shop_title);
        if (specialConf) {
            return specialConf;
        }
    }

    // 🌟 2. 次要優先級：檢查是否手動裝備了「普通等級」稱號
    if (db.equipped_title) {
        const normalConf = TITLE_CONFIG.find(t => t.name === db.equipped_title);
        // 確保它是普通稱號 (等級 <= 100) 且玩家等級足夠才放行
        if (normalConf && normalConf.level <= 100 && db.level >= normalConf.level) {
            return normalConf;
        }
    }

    // 🌟 3. 防呆退路：如果什麼都沒裝備，自動回傳當前等級能拿到的最高普通稱號
    return getTitleForLevel(db.level);
}

// 取得等級對應的最高稱號 (自動過濾掉 999 級的商城/扭蛋稱號)
function getTitleForLevel(level) {
    let currentTitle = TITLE_CONFIG[0]; // 預設給第一個 (例如: 廚房見習生)
    
    // 從陣列最後面往前找，找到符合等級條件的就立刻停止
    for (let i = TITLE_CONFIG.length - 1; i >= 0; i--) {
        // 🌟 核心過濾：必須小於等於 100 級（排除 999 級的特殊稱號）
        if (TITLE_CONFIG[i].level <= 100 && level >= TITLE_CONFIG[i].level) {
            currentTitle = TITLE_CONFIG[i];
            break;
        }
    }
    return currentTitle;
}

       function renderTitleSelect() {
    const list = document.getElementById('unlocked-titles-list');
    if (!list) return;
    list.innerHTML = '';

    const currentTitle = getEquippedTitle();

    TITLE_CONFIG.forEach(title => {
        // 🌟 1. 檢查是否透過扭蛋或商城獲得 (比對陣列內的 id 或稱號字串)
        const isOwned = db.unlocked_shop_titles && (db.unlocked_shop_titles.includes(title.id) || db.unlocked_shop_titles.includes(title.name));
        
        // 🌟 2. 檢查是否達到普通等級解鎖 (999級的特殊稱號會在這裡回傳 false)
        const isLevelUnlocked = title.level <= 100 && db.level >= title.level;
        
        // 最終判定：只要滿足其中一個就算解鎖成功
        const isUnlocked = isLevelUnlocked || isOwned;

        // 🌟 核心修改：更強大、更防呆的配戴中判定！(加入 currentTitle 防呆與 ID 雙重比對)
        const isEquipped = currentTitle && (
            (currentTitle.id && title.id && currentTitle.id === title.id) || 
            (currentTitle.name === title.name)
        );

        let actionHtml = '';
        if (isEquipped) {
            // 加上配戴中的專屬高亮外框，視覺效果更好
            actionHtml = `<span class="bg-emerald-600/30 text-emerald-400 font-bold px-2.5 py-1 rounded-lg text-xs border border-emerald-500/30 flex items-center gap-1"><i class="fa-solid fa-circle-check"></i>配戴中</span>`;
        } else if (isUnlocked) {
            actionHtml = `<button onclick="equipTitle('${title.name}')" class="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-2.5 py-1 rounded-lg border border-zinc-600 text-xs whitespace-nowrap transition-colors">佩戴稱號</button>`;
        } else {
            // 🌟 3. 根據來源顯示對應的鎖定精美外觀
            if (title.source === 'gacha') {
                actionHtml = `<span class="text-purple-400/50 font-bold text-xs flex items-center gap-1 bg-purple-950/20 border border-purple-900/30 px-2 py-1 rounded-lg"><i class="fa-solid fa-lock text-[10px]"></i> 扭蛋限定</span>`;
            } else if (title.source === 'shop') {
                actionHtml = `<span class="text-amber-400/50 font-bold text-xs flex items-center gap-1 bg-amber-950/20 border border-amber-900/30 px-2 py-1 rounded-lg"><i class="fa-solid fa-lock text-[10px]"></i> 商店限定</span>`;
            } else {
                actionHtml = `<span class="text-zinc-500 font-bold text-xs flex items-center gap-1"><i class="fa-solid fa-lock text-[10px]"></i> Lv.${title.level} 解鎖</span>`;
            }
        }

        // 🌟 4. 優化下方成就小提示
        let hintText = '';
        if (isUnlocked) {
            if (title.source === 'gacha') {
                hintText = '<span class="text-[9px] text-purple-400 font-black mt-0.5 animate-pulse">🌌 扭蛋至尊至高神話</span>';
            } else if (title.source === 'shop') {
                hintText = '<span class="text-[9px] text-amber-400 font-bold mt-0.5">💰 商店特惠尊榮稱號</span>';
            } else {
                hintText = '<span class="text-[9px] text-zinc-500 mt-0.5">已獲得此成就權利</span>';
            }
        }

        // 確保沒有 hintText 時不會多出一行空白
        const hintHtml = hintText ? hintText : '';

        list.innerHTML += `
            <div class="bg-zinc-800/60 rounded-xl p-3 border ${isEquipped ? 'border-emerald-500/30 bg-emerald-950/10' : (isUnlocked ? 'border-zinc-700/60' : 'border-zinc-800/40')} flex items-center justify-between gap-3 transition-all">
                <div class="flex flex-col">
                    <span class="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r ${title.color} tracking-wider">
                        ${title.name}
                    </span>
                    ${hintHtml}
                </div>
                <div>${actionHtml}</div>
            </div>
        `;
    });
}

function equipTitle(titleName) {
    const conf = TITLE_CONFIG.find(t => t.name === titleName);
    if (conf) {
        // 🌟 配戴時同步做雙重檢查
        const isOwned = db.unlocked_shop_titles && (db.unlocked_shop_titles.includes(conf.id) || db.unlocked_shop_titles.includes(conf.name));
        const isLevelUnlocked = conf.level <= 100 && db.level >= conf.level;

        if (isLevelUnlocked || isOwned) {
            // 1. 寫入基礎配戴變數
            db.equipped_title = titleName;
            
            // 2. 🌟 核心修復：防止變數打架！
            if (conf.source === 'shop' || conf.source === 'gacha') {
                // 如果穿的是特殊特效稱號，同步更新給 UI 特效系統
                db.equipped_shop_title = conf.id; 
            } else {
                // 如果穿的是普通等級稱號，必須把特效稱號變數「清空」，UI 才會正確顯示普通稱號！
                db.equipped_shop_title = null;    
            }

            saveDB();
            if (typeof playSound !== 'undefined' && playSound.success) playSound.success();
            renderTitleSelect();
            if (typeof updateLobbyUI === 'function') updateLobbyUI(); // 同步重整大廳UI上顯示的頭頂稱號
        }
    }
}

// =========================================
// 🖼️ 邊框選擇與配戴系統
// =========================================

function renderBorderSelect() {
    const list = document.getElementById('unlocked-borders-list');
    if (!list) return;
    list.innerHTML = '';

    // 防呆：確保存檔裡有預設值
    if (!db.unlocked_borders) db.unlocked_borders = ['none'];
    if (!db.equipped_border) db.equipped_border = 'none';

    // 🌟 因為 BORDER_CONFIG 是 Object，我們用 Object.keys() 來取得所有 ID 進行迴圈
    Object.keys(BORDER_CONFIG).forEach(id => {
        const border = BORDER_CONFIG[id];
        
        // 1. 檢查是否解鎖 (預設 none 永遠解鎖，或者是陣列內有包含)
        const isOwned = id === 'none' || db.unlocked_borders.includes(id);
        const isEquipped = db.equipped_border === id;

        // 2. 準備右側的按鈕或鎖定狀態 HTML
        let actionHtml = '';
        if (isEquipped) {
            actionHtml = `<span class="bg-emerald-600/30 text-emerald-400 font-bold px-2.5 py-1 rounded-lg text-xs border border-emerald-500/30 flex items-center gap-1"><i class="fa-solid fa-circle-check"></i>使用中</span>`;
        } else if (isOwned) {
            actionHtml = `<button onclick="equipBorder('${id}')" class="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-2.5 py-1 rounded-lg border border-zinc-600 text-xs transition-colors">配戴邊框</button>`;
        } else {
            // 未解鎖狀態，根據來源顯示不同鎖定圖示
            if (border.source === 'gacha') {
                actionHtml = `<span class="text-purple-400/50 font-bold text-xs flex items-center gap-1 bg-purple-950/20 border border-purple-900/30 px-2 py-1 rounded-lg"><i class="fa-solid fa-lock text-[10px]"></i> 扭蛋限定</span>`;
            } else {
                actionHtml = `<span class="text-zinc-500 font-bold text-xs flex items-center gap-1"><i class="fa-solid fa-lock text-[10px]"></i> 商城購買</span>`;
            }
        }

        // 3. 準備名稱下方的小提示 (提示價格或扭蛋限定)
        let hintHtml = '';
        if (border.source === 'gacha' && isOwned) {
            hintHtml = '<span class="text-[9px] text-purple-400 font-black mt-0.5 animate-pulse">🌌 扭蛋至尊神話</span>';
        } else if (!isOwned && border.cost > 0) {
            hintHtml = `<span class="text-[9px] text-zinc-500 mt-0.5"><i class="fa-solid fa-coins text-yellow-500"></i> ${border.cost} 金幣解鎖</span>`;
        }

        // 4. 將每一個邊框選項加入清單中
        list.innerHTML += `
            <div class="bg-zinc-800/60 rounded-xl p-3 border ${isEquipped ? 'border-emerald-500/30 bg-emerald-950/10' : (isOwned ? 'border-zinc-700/60' : 'border-zinc-800/40')} flex items-center justify-between gap-3 transition-all">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center ${border.class}">
                        <i class="fa-solid fa-user text-zinc-600"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm font-bold text-zinc-200">${border.name}</span>
                        ${hintHtml}
                    </div>
                </div>
                <div>${actionHtml}</div>
            </div>
        `;
    });
}

function equipBorder(borderId) {
    if (db.unlocked_borders.includes(borderId) || borderId === 'none') {
        db.equipped_border = borderId;
        saveDB();
        
        if (typeof playSound !== 'undefined' && playSound.success) playSound.success();
        
        renderBorderSelect();
        if (typeof updateLobbyUI === 'function') updateLobbyUI(); 
    }
}


// =========================================
// 🌐 MQTT 總伺服器連線系統
// =========================================
let client = null; // 將 client 設為全域變數，讓大廳和對戰都能使用
let onlinePlayers = {};
const PRESENCE_TOPIC = 'roach_game/lobby/presence';

function initMQTT() {
    const brokerUrl = 'wss://mqttgo.io:8084/mqtt';
    const options = {
        clientId: pvpState.myPlayerId,
        keepalive: 60,
        clean: true
    };

    try {
        client = mqtt.connect(brokerUrl, options);

        client.on('connect', () => {
            console.log("伺服器已連線");
            
            // 🚨 兇手通常在這裡：必須「訂閱頻道」才收得到別人的廣播！
            client.subscribe(PRESENCE_TOPIC, (err) => {
                if (!err) {
                    console.log(`檢查成功`);
                } else {
                    console.error("檢查失敗:", err);
                }
            });
            
            // 啟動發送心跳包
            startPresenceHeartbeat(); 
        });

        client.on('message', (topic, message) => {
            try {
                const payload = JSON.parse(message.toString());
                
                // 🚨 接收端邏輯：攔截大廳名單的心跳包，並寫入 onlinePlayers
                if (topic === PRESENCE_TOPIC) {
                    // 將收到的人存進名單，並記錄現在的時間 (lastSeen)
                    onlinePlayers[payload.id] = { ...payload, lastSeen: Date.now() };
                    
                    // 收到資料後，立刻觸發 UI 刷新！
                    updateOnlinePlayersUI();
                    return; 
                }

                // 下面是原本的對戰房間封包處理
                if (topic === `roach_pvp/room_${pvpState.roomId}`) {
                    if (payload.sender !== pvpState.myPlayerId) {
                        if (typeof handlePvPMsg === 'function') handlePvPMsg(payload);
                    }
                }
            } catch (e) {
                // 如果有人傳了不是 JSON 的亂碼，這裡會攔截下來
            }
        });

        client.on('error', (err) => {
            console.error('MQTT error:', err);
        });

    } catch (err) {
        console.error("MQTT 初始化失敗:", err);
    }
}

// =========================================
// 👤 玩家名稱系統 (Naming System)
// =========================================


function generateRandomName() {
    const prefix = RANDOM_NAMES_PREFIX[Math.floor(Math.random() * RANDOM_NAMES_PREFIX.length)];
    const suffix = RANDOM_NAMES_SUFFIX[Math.floor(Math.random() * RANDOM_NAMES_SUFFIX.length)];
    const input = document.getElementById('player-name-input');
    if (input) {
        input.value = prefix + '的' + suffix;
        if (typeof playSound !== 'undefined' && playSound.tap) playSound.tap();
    }
}

function checkPlayerName() {
    if (!db.username) {
        document.getElementById('naming-modal').classList.remove('hidden');
        generateRandomName();
    } else {
        const nameEl = document.getElementById('lobby-username');
        if (nameEl) nameEl.innerText = db.username;
    }
}

function confirmPlayerName() {
    const input = document.getElementById('player-name-input');
    let name = input.value.trim();
    if (name.length === 0) return alert("名稱不能為空！");
    if (name.length > 8) name = name.substring(0, 8);

    db.username = name;
    saveDB();
    if (typeof playSound !== 'undefined' && playSound.success) playSound.success();
    
    document.getElementById('naming-modal').classList.add('hidden');
    checkPlayerName();
}

// =========================================
// 📝 玩家改名系統 (消耗 10,000 金幣)
// =========================================

// 開啟改名視窗
function openChangeNameModal() {
    if (typeof playSound !== 'undefined' && playSound.thud) playSound.thud();
    
    const inputEl = document.getElementById('new-username-input');
    if (inputEl) inputEl.value = db.username || ''; // 預設帶入舊名字
    
    document.getElementById('change-name-modal').classList.remove('hidden');
}

// 關閉改名視窗
function closeChangeNameModal() {
    document.getElementById('change-name-modal').classList.add('hidden');
}

// 確認改名扣錢
function confirmChangeName() {
    const inputEl = document.getElementById('new-username-input');
    if (!inputEl) return;

    const newName = inputEl.value.trim();

    // 🔍 條件檢查 1：是否為空
    if (!newName) {
        alert("❌ 名字不能是空白的喔！");
        return;
    }

    // 🔍 條件檢查 2：是否跟舊的一樣
    if (newName === db.username) {
        alert("❌ 這不就是你現在的名字嗎？");
        return;
    }

    // 🔍 條件檢查 3：金幣是否足夠
    const CHANGE_NAME_COST = 10000;
    if (db.coins < CHANGE_NAME_COST) {
        alert(`❌ 金幣不足！改名需要 ${CHANGE_NAME_COST.toLocaleString()} 金幣，你目前只有 ${db.coins.toLocaleString()}。`);
        return;
    }

    // 💰 通過檢查，正式扣錢與改名
    db.coins -= CHANGE_NAME_COST;
    db.username = newName;

    // 💾 儲存資料與刷新大廳 UI
    saveDB();
    updateLobbyUI();
    closeChangeNameModal();

    if (typeof playSound !== 'undefined' && playSound.success) playSound.success();
    alert(`🎉 改名成功！歡迎新身份：${newName}`);

    // 📡 【核心同步】立刻向 MQTT 發送新心跳，讓線上名單的其他人即時看到你的新名字！
    if (client && client.connected && typeof PRESENCE_TOPIC !== 'undefined') {
        let currentTitleName = '無稱號';
        let currentTitleColor = 'from-zinc-400 to-zinc-500';
        
        if (typeof TITLE_CONFIG !== 'undefined') {
            let myTitleObj = null;
            if (db.equipped_title) {
                myTitleObj = TITLE_CONFIG.find(t => t.name === db.equipped_title || t.id === db.equipped_title);
            } else if (db.equipped_shop_title) {
                myTitleObj = TITLE_CONFIG.find(t => t.id === db.equipped_shop_title);
            }
            if (!myTitleObj) {
                for (let i = TITLE_CONFIG.length - 1; i >= 0; i--) {
                    if (TITLE_CONFIG[i].level <= 100 && db.level >= TITLE_CONFIG[i].level) {
                        myTitleObj = TITLE_CONFIG[i];
                        break;
                    }
                }
            }
            if (myTitleObj) {
                currentTitleName = myTitleObj.name;
                currentTitleColor = myTitleObj.color;
            }
        }

        // 馬上廣播改名後的全新資訊
        client.publish(PRESENCE_TOPIC, JSON.stringify({
            id: pvpState.myPlayerId,
            name: db.username,
            level: db.level || 1,
            titleName: currentTitleName,
            titleColor: currentTitleColor
        }));
    }
}

// =========================================
// 🟢 線上玩家心跳偵測系統 (抓兇手版)
// =========================================
function startPresenceHeartbeat() {
    const sendHeartbeat = () => {
        // 💡 1. 檢查 client 狀態
        if (typeof client === 'undefined' || !client) {
            //console.error("❌ [心跳阻擋] 找不到 client 變數！(可能是變數宣告範圍錯誤)");
            return;
        }
        
        // 💡 2. 檢查連線狀態
        if (!client.connected) {
            //console.warn("⚠️ [心跳阻擋] client 尚未連線完成。");
            return;
        }

        // 💡 3. 檢查玩家名字
        if (!db || !db.username) {
            //console.warn("⚠️ [心跳阻擋] 找不到 db.username，玩家可能還沒取名字？");
            return;
        }

        // 💡 4. 如果前面都通過了，就準備發送！
        let currentTitleName = '無稱號';
        let currentTitleColor = 'text-zinc-400';
        if (typeof TITLE_CONFIG !== 'undefined') {
            // 1. 先找有沒有裝備中的稱號 (用 find 去比對 name 或 id)
            let myTitleObj = null;
            
            if (db.equipped_title) {
                myTitleObj = TITLE_CONFIG.find(t => t.name === db.equipped_title || t.id === db.equipped_title);
            } else if (db.equipped_shop_title) {
                // 如果相容了商城稱號系統，也檢查這個
                myTitleObj = TITLE_CONFIG.find(t => t.id === db.equipped_shop_title);
            }

            // 2. 如果都沒有裝備，就給他對應等級的預設稱號
            if (!myTitleObj) {
                // 從後面倒著找，找到第一個符合等級的稱號
                for (let i = TITLE_CONFIG.length - 1; i >= 0; i--) {
                    if (TITLE_CONFIG[i].level <= 100 && db.level >= TITLE_CONFIG[i].level) {
                        myTitleObj = TITLE_CONFIG[i];
                        break;
                    }
                }
            }
            
            // 3. 最後把顏色和名字塞進去
            if (myTitleObj) {
                currentTitleName = myTitleObj.name;
                currentTitleColor = myTitleObj.color;
            }
        }
		
		
        const myInfo = {
            id: pvpState.myPlayerId || 'unknown_id', 
            name: db.username,
            level: db.level || 1,
            titleName: currentTitleName,
            titleColor: currentTitleColor
        };
        
        try {
            client.publish(PRESENCE_TOPIC, JSON.stringify(myInfo));
            //console.log("💗 已發送線上心跳包:", myInfo.name); 
        } catch (error) {
            //console.error("❌ 發送心跳時發生錯誤:", error);
        }
    };

    // 立刻發送第一次
    sendHeartbeat();
    
    // 之後每 5 秒發送一次
    setInterval(sendHeartbeat, 5000);
}

// =========================================
// 刷新線上玩家名單的介面 (UI) - 🛠️ Debug 版
// =========================================
function updateOnlinePlayersUI() {
    const now = Date.now();
    let count = 0;
    const listEl = document.getElementById('online-players-list');
    if (!listEl) return;

    listEl.innerHTML = ''; // 清空舊名單

    for (let id in onlinePlayers) {
        // 如果超過 7 秒沒發送心跳，代表他斷線了，剔除
        if (now - onlinePlayers[id].lastSeen > 7000) {
            delete onlinePlayers[id];
            continue;
        }

        count++;
        const p = onlinePlayers[id];
        
        // 建立名單小卡片
        const item = document.createElement('div');
        item.className = "flex justify-between items-center bg-zinc-800/60 border border-zinc-700/50 px-4 py-3 rounded-xl animate-fade-in";
        
        // 辨識這個名字是不是玩家自己
        const isMe = (id === pvpState.myPlayerId) 
            ? ' <span class="text-[10px] bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-1.5 py-0.5 rounded ml-1 flex-shrink-0">你</span>' 
            : '';

        // 🌟 這裡修復了！加上 text-transparent bg-clip-text bg-gradient-to-r 讓漸層生效！
        item.innerHTML = `
            <div class="text-left flex flex-col justify-center">
                <span class="text-[11px] font-black text-transparent bg-clip-text bg-gradient-to-r ${p.titleColor || 'from-zinc-400 to-zinc-500'} block mb-0.5 max-w-fit">${p.titleName || '無稱號'}</span>
                <span class="font-black text-white tracking-wide text-sm flex items-center">${p.name}${isMe}</span>
            </div>
            <div class="text-right font-mono flex items-center">
                <span class="text-emerald-400 font-black text-sm bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-700/50">Lv.${p.level}</span>
            </div>
        `;
        listEl.appendChild(item);
    }

    // 更新大廳「換邊框」右邊那個「線上: X」按鈕的數字
    const countEl = document.getElementById('online-count');
    if (countEl) countEl.innerText = count;
}



        // ==========================================
        // PvP Mode Integration Logic
        // ==========================================
        function openPvPModal() {
			switchBGM(pvpBgm);
            playSound.success();
            document.getElementById('pvp-modal').classList.remove('hidden');
            generateRandomRoom();
        }

        function closePvPModal() {
            if (client) { client.end(); client = null; }
            if (pvpState.pingTimer) { clearInterval(pvpState.pingTimer); pvpState.pingTimer = null; }
            document.getElementById('pvp-modal').classList.add('hidden');
			switchBGM(bgm);
        }


        function generateRandomRoom() {
            const r = Math.floor(1000 + Math.random() * 9000);
            document.getElementById('pvp-room-input').value = r;
        }

        function resetPvPConnectBtn() {
            const btn = document.getElementById('pvp-connect-btn');
            btn.disabled = false;
            btn.classList.remove('opacity-50');
            btn.textContent = "連線並等待對手";
        }
		
		let isPvpSearching = false;
		let pvpSearchTimeout = null;

        function startPvPMatch() {
			const input = document.getElementById('pvp-room-input').value.trim();
			if (!input) {
				alert('請輸入房號！');
				return;
			}
			isPvpSearching = true;
			document.getElementById('pvp-room-input').disabled = true;
			pvpState.roomId = input;
			pvpState.opponentId = '';
			pvpState.opponentHp = 100;
			pvpState.pvpCoins = 0;

			document.getElementById('pvp-status-box').classList.remove('hidden');
			document.getElementById('pvp-status-text').textContent = "連線中...";
			document.getElementById('pvp-status-detail').textContent = "正在連接至對戰伺服器...";
			
			const btn = document.getElementById('pvp-connect-btn');
			btn.disabled = true;
			btn.classList.add('opacity-50');
			btn.textContent = "配對中...";

			// 🌟 檢查全域的 MQTT client 是否已經連線
			if (!client || !client.connected) {
				document.getElementById('pvp-status-text').textContent = "伺服器未連線";
				document.getElementById('pvp-status-detail').textContent = "請確認網路狀態或重新整理網頁！";
				resetPvPConnectBtn();
				return;
			}

			// 直接訂閱該房間，不需要重新 connect 了！
			document.getElementById('pvp-status-text').textContent = "伺服器已連線";
			document.getElementById('pvp-status-detail').textContent = "訂閱房間主題中...";
			
			const topic = `roach_pvp/room_${pvpState.roomId}`;
			client.subscribe(topic, (err) => {
				if (err) {
					console.error('Subscribe Error:', err);
					document.getElementById('pvp-status-detail').textContent = "訂閱失敗，請重試！";
					resetPvPConnectBtn();
					return;
				}
				
				document.getElementById('pvp-status-text').textContent = "等待對手加入...";
				document.getElementById('pvp-status-detail').textContent = `請讓對手也輸入相同房號: ${pvpState.roomId}`;

				// 開始對戰心跳 (Ping) 來尋找對手
				if(pvpState.pingTimer) clearInterval(pvpState.pingTimer);
				pvpState.pingTimer = setInterval(() => {
					// (注意這裡呼叫了你原本寫好的 sendPvpMsg)
					sendPvpMsg({
						type: 'ping',
						sender: pvpState.myPlayerId,
						senderHp: gameState.targetHp
					});
				}, 1000);
			});
		}
		
		// 玩家主動取消 PVP 配對
		function cancelPvpMatchmaking() {
			if (!isPvpSearching) return;
			
			isPvpSearching = false;
			console.log("🚫 玩家已取消連線");

			// 1. 清除超時器
			if (pvpSearchTimeout) {
				clearTimeout(pvpSearchTimeout);
				pvpSearchTimeout = null;
			}

			// 2. 取消 MQTT 連線 (請依你的實作調整)
			// if (mqttClient) mqttClient.unsubscribe('...');

			// 3. 介面恢復：隱藏「狀態提示區」，顯示「連線按鈕」
			document.getElementById('pvp-status-box').classList.add('hidden');
			document.getElementById('pvp-connect-btn').classList.remove('hidden');
			
			// 解除輸入框鎖定
			document.getElementById('pvp-room-input').disabled = false;
			resetPvPConnectBtn();
		}

        function sendPvpMsg(msg) {
            if (client && client.connected) {
                const topic = `roach_pvp/room_${pvpState.roomId}`;
                client.publish(topic, JSON.stringify(msg));
            }
        }

        function handlePvPMsg(msg) {
            if (msg.type === 'ping') {
                pvpState.lastOpponentHeartbeat = performance.now();
                if (!pvpState.opponentId) {
                    pvpState.opponentId = msg.sender;
                    // Respond immediately to lock-in the pairing
                    sendPvpMsg({
                        type: 'ping',
                        sender: pvpState.myPlayerId,
                        senderHp: gameState.targetHp
                    });
                    
                    // Trigger PVP session start
                    startPvPGameSession();
                } else if (pvpState.opponentId === msg.sender) {
                    pvpState.opponentHp = msg.senderHp;
                    updateOpponentHpUI();
                }
            } else if (msg.type === 'hp_sync') {
                pvpState.opponentHp = msg.hp;
                updateOpponentHpUI();
            } else if (msg.type === 'trap_darken') {
                applyDarkenTrap();
            } else if (msg.type === 'trap_swarm') {
                applySwarmTrap();
            } else if (msg.type === 'trap_party') {
                applyPartyTrap();
            } else if (msg.type === 'game_over_lose') {
                triggerPvPWin();
            }
        }

        function updateOpponentHpUI() {
            const oppHpBar = document.getElementById('pvp-opp-hp-bar');
            const oppHpText = document.getElementById('pvp-opp-hp-text');
            if (oppHpBar && oppHpText) {
                oppHpBar.style.width = `${pvpState.opponentHp}%`;
                oppHpText.textContent = `${pvpState.opponentHp}%`;
            }
        }

        function updatePvpCoinsUI() {
            document.getElementById('pvp-coins-text').textContent = pvpState.pvpCoins;
            
            // Highlight buttons when affordable
            const b1 = document.getElementById('btn-trap-darken');
            const b2 = document.getElementById('btn-trap-swarm');
            const b3 = document.getElementById('btn-trap-party');
            if (pvpState.pvpCoins >= 100) { b1.classList.remove('opacity-50'); b1.classList.add('border-purple-500'); } else { b1.classList.add('opacity-50'); }
            if (pvpState.pvpCoins >= 150) { b2.classList.remove('opacity-50'); b2.classList.add('border-red-500'); } else { b2.classList.add('opacity-50'); }
            if (pvpState.pvpCoins >= 250) { b3.classList.remove('opacity-50'); b3.classList.add('border-amber-500'); } else { b3.classList.add('opacity-50'); }
        }

        function startPvPGameSession() {
            closeModals();
            document.getElementById('lobby-screen').classList.add('hidden');
            document.getElementById('game-container').classList.remove('hidden');
            document.getElementById('top-bar').classList.remove('hidden');
            document.getElementById('bottom-bar').classList.remove('hidden');

            // Hide normal battle counters
            document.getElementById('battle-stats').classList.add('hidden');
            document.getElementById('sandbox-stats').classList.add('hidden');
            document.getElementById('sandbox-tools').classList.add('hidden');

            // Show PvP indicators
            document.getElementById('pvp-stats').classList.remove('hidden');
            document.getElementById('pvp-stats').classList.add('flex');
            document.getElementById('pvp-traps-panel').classList.remove('hidden');
            document.getElementById('pvp-traps-panel').classList.add('flex');

            // Set scene
            gameState.scene = 'kitchen';
            Object.values(SCENE_CONFIG).forEach(c => document.getElementById(c.bgId).classList.add('scene-hidden'));
            document.getElementById(SCENE_CONFIG['kitchen'].bgId).classList.remove('scene-hidden');
            document.getElementById(SCENE_CONFIG['kitchen'].targetId).style.display = 'block';

            pvpState.active = true;
            pvpState.opponentHp = 100;
            pvpState.pvpCoins = 0;
            updateOpponentHpUI();
            updatePvpCoinsUI();

            document.getElementById('pvp-blind-overlay').classList.add('hidden');
            document.getElementById('pvp-trap-notification').classList.add('hidden');

            gameState.active = true;
            gameState.mode = 'battle';
            gameState.score = 0;
            gameState.sessionCoins = 0;
            gameState.targetHp = 100;
            gameState.combo = 0;
            gameState.cooldowns = { slipper: 0, grandma_slipper: 0, newspaper: 0, pesticide_bomb: 0, golden_slipper: 0 };
            gameState.shieldActive = false;
            gameState.shieldEndTime = 0;

            clearEntities();
            buildInGameWeaponBar();
            updateTargetHp(); 
            updateItemUI();
            
            playSound.success();
            gameState.timeSpeed = 5;

            window.dispatchEvent(new Event('resize'));
        }

        function buyPvPTrap(type) {
            if (!pvpState.active) return;
            if (type === 'darken') {
                if (pvpState.pvpCoins >= 100) {
                    pvpState.pvpCoins -= 100;
                    updatePvpCoinsUI();
                    sendPvpMsg({
                        type: 'trap_darken',
                        sender: pvpState.myPlayerId
                    });
                    playSound.success();
                } else {
                    playSound.damage();
                    alert('對戰幣不足！(需要 $100)');
                }
            } else if (type === 'swarm') {
                if (pvpState.pvpCoins >= 150) {
                    pvpState.pvpCoins -= 150;
                    updatePvpCoinsUI();
                    sendPvpMsg({
                        type: 'trap_swarm',
                        sender: pvpState.myPlayerId
                    });
                    playSound.success();
                } else {
                    playSound.damage();
                    alert('對戰幣不足！(需要 $150)');
                }
            } else if (type === 'party') {
                if (pvpState.pvpCoins >= 250) {
                    pvpState.pvpCoins -= 250;
                    updatePvpCoinsUI();
                    sendPvpMsg({
                        type: 'trap_party',
                        sender: pvpState.myPlayerId
                    });
                    playSound.success();
                } else {
                    playSound.damage();
                    alert('對戰幣不足！(需要 $250)');
                }
            }
        }

        function applyDarkenTrap() {
            playSound.boom();
            const overlay = document.getElementById('pvp-blind-overlay');
            overlay.classList.remove('hidden');
            overlay.style.opacity = '1';

            const notif = document.getElementById('pvp-trap-notification');
            document.getElementById('pvp-notif-msg').textContent = "對手朝你使用了致盲迷霧！";
            notif.classList.remove('hidden');

            setTimeout(() => {
                overlay.classList.add('hidden');
                notif.classList.add('hidden');
            }, 5000);
        }

        function applySwarmTrap() {
            playSound.levelup();
            const notif = document.getElementById('pvp-trap-notification');
            document.getElementById('pvp-notif-msg').textContent = "對手朝你釋放了一群小強！";
            notif.classList.remove('hidden');

            const count = 8 + Math.floor(Math.random() * 3);
            for (let i = 0; i < count; i++) {
                spawnRoach();
            }

            setTimeout(() => {
                notif.classList.add('hidden');
            }, 3000);
        }

        function applyPartyTrap() {
            playSound.levelup();
            const notif = document.getElementById('pvp-trap-notification');
            document.getElementById('pvp-notif-msg').textContent = "⚠️對手在角落舉辦了小強派對！⚠️";
            notif.classList.remove('hidden');

            // 從四個角落各派出一些小強（每邊派出 1~3 隻，總計 5~10 隻）
            const corners = [
                {x: 20, y: 70},                  // 左上
                {x: width - 20, y: 70},          // 右上
                {x: 20, y: height - 20},         // 左下
                {x: width - 20, y: height - 20}  // 右下
            ];

            corners.forEach(corner => {
                const count = 1 + Math.floor(Math.random() * 2.5); // 1~3 隻
                for (let i = 0; i < count; i++) {
                    // 給予一點偏移避免重疊
                    const rx = corner.x + (Math.random() - 0.5) * 15;
                    const ry = corner.y + (Math.random() - 0.5) * 15;
                    roaches.push(new Cockroach(rx, ry));
                }
            });

            setTimeout(() => {
                notif.classList.add('hidden');
            }, 3000);
        }

        function triggerPvPLose() {
            gameState.active = false;
            pvpState.active = false;
            if (client) { client.end(); client = null; }
            if (pvpState.pingTimer) { clearInterval(pvpState.pingTimer); pvpState.pingTimer = null; }

            const modal = document.getElementById('pvp-end-modal');
            const box = document.getElementById('pvp-end-box');
            const title = document.getElementById('pvp-result-title');
            const desc = document.getElementById('pvp-result-desc');
            const icon = document.getElementById('pvp-result-icon');
            const gold = document.getElementById('pvp-gold-reward');
            const room = document.getElementById('pvp-end-room');

            box.className = "w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl border-2 border-red-500 bg-zinc-900";
            title.textContent = "YOU LOSE";
            title.className = "text-4xl font-black mb-2 tracking-widest text-red-500";
            desc.textContent = "守護防線失敗，你的蛋糕已被啃食殆盡！再接再厲！";
            icon.textContent = "💀";
            gold.textContent = "+0";
            room.textContent = pvpState.roomId;

            modal.classList.remove('hidden');
        }

        function triggerPvPWin() {
            gameState.active = false;
            pvpState.active = false;
            if (client) { client.end(); client = null; }
            if (pvpState.pingTimer) { clearInterval(pvpState.pingTimer); pvpState.pingTimer = null; }

            db.coins += 100;
            saveDB();

            const modal = document.getElementById('pvp-end-modal');
            const box = document.getElementById('pvp-end-box');
            const title = document.getElementById('pvp-result-title');
            const desc = document.getElementById('pvp-result-desc');
            const icon = document.getElementById('pvp-result-icon');
            const gold = document.getElementById('pvp-gold-reward');
            const room = document.getElementById('pvp-end-room');

            box.className = "w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl border-2 border-yellow-500 bg-zinc-900";
            title.textContent = "YOU WIN!";
            title.className = "text-4xl font-black mb-2 tracking-widest text-yellow-500";
            desc.textContent = "幹得好！成功擊潰對手，你是真正的滅蟑至尊！";
            icon.textContent = "🏆";
            gold.textContent = "+100";
            room.textContent = pvpState.roomId;

            modal.classList.remove('hidden');
            playSound.success();
        }

        // ==========================================
        // Dex & Shop & Items
        // ==========================================
        function openDex() {
            playSound.success(); document.getElementById('dex-modal').classList.remove('hidden');
            const list = document.getElementById('dex-list'); list.innerHTML = '';
            
            Object.keys(ROACH_TYPES).forEach(type => {
                const info = ROACH_TYPES[type]; const kills = db.kills[type]; const unlocked = kills > 0;
                
                list.innerHTML += `
                    <div class="bg-zinc-800/80 rounded-xl p-3 border ${unlocked ? 'border-purple-500/50' : 'border-zinc-700'} flex flex-col items-center text-center gap-2 relative overflow-hidden">
                        ${!unlocked ? '<div class="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-zinc-500"><i class="fa-solid fa-question text-3xl mb-1"></i><span class="text-xs">未發現</span></div>' : ''}
                        <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                            <i class="fa-solid fa-bug text-2xl ${info.iconColor}"></i>
                        </div>
                        <div>
                            <div class="font-bold text-white text-sm">${info.name}</div>
                            <div class="text-[10px] text-zinc-400 mt-1 line-clamp-3">${info.desc}</div>
                        </div>
                        <div class="mt-auto bg-black/50 px-2 py-1 rounded text-xs text-purple-300 w-full font-mono">
                            討伐數: ${kills}
                        </div>
                    </div>
                `;
            });
        }

        function openWeaponShop() { playSound.success(); document.getElementById('weapon-modal').classList.remove('hidden'); renderWeaponShop(); }
        function renderWeaponShop() {
            const list = document.getElementById('lobby-weapon-list'); list.innerHTML = '';
            Object.keys(WEAPON_CONFIG).forEach(w => {
                const conf = WEAPON_CONFIG[w]; const lvl = db.w_levels[w]; const unlocked = db.weapons.includes(w); const cost = conf.upgradeBase * lvl;
                let actionHtml = '';
                if (!unlocked) actionHtml = `<button onclick="buyWeapon('${w}')" class="bg-zinc-800 hover:bg-zinc-700 text-yellow-400 font-bold px-3 py-1.5 rounded-lg border border-zinc-600 text-sm whitespace-nowrap"><i class="fa-solid fa-lock mr-1"></i>解鎖 ${conf.baseCost}</button>`;
                else if (lvl >= 10) actionHtml = `<span class="text-zinc-500 font-bold text-sm bg-zinc-800 px-3 py-1.5 rounded-lg whitespace-nowrap">MAX LVL</span>`;
                else actionHtml = `<button onclick="upgradeWeapon('${w}')" class="bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 font-bold px-3 py-1.5 rounded-lg border border-emerald-500/50 text-sm whitespace-nowrap"><i class="fa-solid fa-arrow-up mr-1"></i>升級 ${cost}</button>`;

                list.innerHTML += `
                    <div class="bg-zinc-800/80 rounded-xl p-3 border ${unlocked ? 'border-zinc-600' : 'border-zinc-800'} flex items-center gap-3">
                        <div class="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-700 flex-shrink-0" style="${unlocked && lvl>1 ? `box-shadow: 0 0 ${lvl}px ${conf.glow}` : ''}">
                            <i class="fa-solid ${conf.icon} text-2xl ${unlocked ? conf.color : 'text-zinc-600'}"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-bold text-white flex items-center gap-2 truncate">${conf.name} <span class="text-xs font-mono bg-black px-1 rounded text-zinc-400">Lv.${unlocked ? lvl : 0}</span></div>
                            <div class="text-[10px] text-zinc-400 mt-0.5 truncate">傷害:${conf.baseDmg+(unlocked?lvl-1:0)} / 範圍:${conf.baseRadius} / CD:${Math.max(0, conf.baseCd - (unlocked?lvl-1:0)*conf.cdReduction).toFixed(1)}s</div>
                        </div>
                        <div>${actionHtml}</div>
                    </div>
                `;
            });
            document.getElementById('shop-coins-display').textContent = db.coins;
        }

        function buyWeapon(w) { const cost = WEAPON_CONFIG[w].baseCost; if(db.coins >= cost) { db.coins -= cost; db.weapons.push(w); saveDB(); playSound.success(); renderWeaponShop(); } else { playSound.damage(); alert('金幣不足！'); } }
        function upgradeWeapon(w) { const lvl = db.w_levels[w]; const cost = WEAPON_CONFIG[w].upgradeBase * lvl; if(db.coins >= cost) { db.coins -= cost; db.w_levels[w]++; saveDB(); playSound.success(); renderWeaponShop(); } else { playSound.damage(); alert('金幣不足！'); } }

        function openItemShop() { playSound.success(); document.getElementById('item-modal').classList.remove('hidden'); renderItemShop(); }
        function renderItemShop() {
            const list = document.getElementById('lobby-item-list'); list.innerHTML = '';
            Object.keys(ITEM_CONFIG).forEach(i => {
                const conf = ITEM_CONFIG[i]; 
                const count = db.items[i] || 0;
                
                list.innerHTML += `
                    <div class="bg-zinc-800/80 rounded-xl p-3 border border-cyan-800 flex items-center gap-3">
                        <div class="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center border border-cyan-700 flex-shrink-0">
                            <i class="fa-solid ${conf.icon} text-2xl ${conf.color}"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-bold text-white flex items-center gap-2 truncate">${conf.name} <span class="text-xs font-mono bg-cyan-900 px-1 rounded text-cyan-200">庫存: ${count}</span></div>
                            <div class="text-[10px] text-zinc-400 mt-0.5">${conf.desc}</div>
                        </div>
                        <div>
                            <button onclick="buyItem('${i}')" class="bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 font-bold px-3 py-1.5 rounded-lg border border-cyan-500/50 text-sm whitespace-nowrap flex items-center gap-1">
                                <i class="fa-solid fa-coins text-[10px]"></i> ${conf.cost}
                            </button>
                        </div>
                    </div>
                `;
            });
            document.getElementById('item-shop-coins-display').textContent = db.coins;
        }

        function buyItem(item) {
            const cost = ITEM_CONFIG[item].cost;
            if (db.coins >= cost) {
                db.coins -= cost;
                db.items[item] = (db.items[item] || 0) + 1;
                saveDB();
                playSound.success();
                renderItemShop();
            } else {
                playSound.damage();
                alert('金幣不足！');
            }
        }

        function useItem(item) {
            if (!gameState.active || gameState.mode !== 'battle') return;
            
            const count = db.items[item] || 0;
            if (count <= 0) return;
            
            if (item === 'plastic_wrap' && !gameState.shieldActive) {
                db.items[item]--;
                saveDB();
                updateItemUI();
                
                gameState.shieldActive = true;
                gameState.shieldEndTime = performance.now() + 5000;
                playSound.shieldOn();
                
                const shieldId = `shield-effect-${gameState.scene}`;
                const shieldEl = document.getElementById(shieldId);
                if (shieldEl) shieldEl.classList.remove('hidden');
                
                const cdOverlay = document.getElementById('shield-cd-overlay');
                cdOverlay.style.opacity = '1';
            }
        }

        function updateItemUI() {
            const count = db.items['plastic_wrap'] || 0;
            const btn = document.getElementById('btn-use-shield');
            document.getElementById('battle-shield-count').textContent = count;
            
            if (count <= 0) {
                btn.classList.add('opacity-50', 'grayscale');
            } else {
                btn.classList.remove('opacity-50', 'grayscale');
            }
        }

        // ==========================================
        // Game Entities
        // ==========================================
        class Cockroach {
            constructor(x, y) {
                this.id = 'roach_' + Math.random().toString(36).substr(2, 9);
                this.x = x; this.y = y; this.vx = (Math.random()-0.5)*4; this.vy = (Math.random()-0.5)*4;
                this.angle = 0; this.state = 'wandering'; this.targetCrumb = null; this.eatingTimer = 0;
                
                let r = Math.random();
                this.type = 'normal';
                
                if (gameState.mode === 'battle') {
                    if (gameState.isNight && r < 0.25) this.type = 'ninja';
                    else if (r < 0.1) this.type = 'golden';
                    else if (r > 0.8) this.type = 'tank';
                }

                this.speed = (gameState.mode==='sandbox') ? (1.5+Math.random()*2) : (2.0+Math.random()*2.5);
                this.scale = 0.7 + Math.random() * 0.4; this.hp = 1;

                if (this.type === 'golden') { this.speed *= 1.6; this.scale *= 0.8; } 
                else if (this.type === 'tank') { this.hp = 3 + Math.floor(gameState.score/200); this.speed *= 0.6; this.scale *= 1.35; }
                else if (this.type === 'ninja') { this.speed *= 2.0; this.scale *= 0.6; }
                
                this.dom = this.createDOM(); containers.roaches.appendChild(this.dom);
            }
            createDOM() {
                const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('id', this.id);
                const ca = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); ca.setAttribute('r', '32'); ca.setAttribute('fill', 'transparent'); ca.style.cursor='pointer';
                const mg = document.createElementNS('http://www.w3.org/2000/svg', 'g'); mg.setAttribute('transform', `scale(${this.scale})`); mg.setAttribute('id', this.id+'_mg');
                
                let bFill = '#78350f', hFill = '#b45309', strk = '#451a03';
                if(this.type==='golden'){ bFill='url(#gold-grad)'; hFill='#f59e0b'; strk='#b45309'; }
                if(this.type==='tank'){ bFill='url(#tank-grad)'; hFill='#3f3f46'; strk='#09090b'; }
                if(this.type==='ninja'){ bFill='url(#ninja-grad)'; hFill='#1e1b4b'; strk='#000000'; }
                
                mg.innerHTML = `
                    <path d="M-3 -15 C-8 -30,-15 -25,-25 -35" fill="none" stroke="${strk}" stroke-width="1.5" id="${this.id}_al"/>
                    <path d="M3 -15 C8 -30,15 -25,25 -35" fill="none" stroke="${strk}" stroke-width="1.5" id="${this.id}_ar"/>
                    <path d="M-10 -8 Q-18 -14,-23 -16" stroke="${strk}" stroke-width="${this.type==='tank'?3:2}" fill="none" id="${this.id}_l1"/>
                    <path d="M-10 0 Q-20 0,-25 2" stroke="${strk}" stroke-width="${this.type==='tank'?3:2}" fill="none" id="${this.id}_l2"/>
                    <path d="M-10 8 Q-18 14,-22 18" stroke="${strk}" stroke-width="${this.type==='tank'?3:2}" fill="none" id="${this.id}_l3"/>
                    <path d="M10 -8 Q18 -14,23 -16" stroke="${strk}" stroke-width="${this.type==='tank'?3:2}" fill="none" id="${this.id}_l4"/>
                    <path d="M10 0 Q20 0,25 2" stroke="${strk}" stroke-width="${this.type==='tank'?3:2}" fill="none" id="${this.id}_l5"/>
                    <path d="M10 8 Q18 14,22 18" stroke="${strk}" stroke-width="${this.type==='tank'?3:2}" fill="none" id="${this.id}_l6"/>
                    <ellipse cx="0" cy="0" rx="10" ry="18" fill="${bFill}" stroke="${strk}" stroke-width="2"/>
                    <ellipse cx="0" cy="-13" rx="7" ry="7" fill="${hFill}"/>
                    ${this.type==='ninja' ? '<path d="M-7 -14 Q0 -10 7 -14 Q0 -16 -7 -14 Z" fill="#ef4444"/>' : ''}
                    <circle cx="-3.5" cy="-15" r="1.8" fill="${this.type==='ninja'?'#fff':'#000'}"/><circle cx="3.5" cy="-15" r="1.8" fill="${this.type==='ninja'?'#fff':'#000'}"/>
                    <path d="M0 -8 Q-8 5,-3 16" fill="none" stroke="${strk}" stroke-width="1.2"/>
                    <path d="M0 -8 Q8 5,3 16" fill="none" stroke="${strk}" stroke-width="1.2"/>
                `;
                g.appendChild(ca); g.appendChild(mg); return g;
            }
            takeDamage(dmg, sx, sy) {
                if(this.state==='dead') return false;
                
                if(this.type === 'ninja' && Math.random() < 0.3) {
                    createSparkle(this.x, this.y, '#a855f7');
                    this.x += (Math.random()-0.5)*100; this.y += (Math.random()-0.5)*100;
                    return false;
                }

                this.hp -= dmg;
                if(this.hp <= 0) return true;
                playSound.thud();
                const mg = document.getElementById(this.id+'_mg');
                if(mg) { mg.style.opacity = '0.4'; setTimeout(()=>mg.style.opacity='1', 100); }
                const dx=this.x-sx, dy=this.y-sy, d=Math.hypot(dx,dy)||1;
                this.x+=(dx/d)*15; this.y+=(dy/d)*15; this.state='wandering';
                createSparkle(this.x, this.y, '#84cc16'); return false;
            }
            update(time) {
                if(this.state==='dead') return;
                // 拖曳狀態，更新旋轉角，但不處理 AI
                if(this.state==='dragged') { 
                    this.angle=(this.angle+10)%360; 
                    this.dom.setAttribute('transform', `translate(${this.x},${this.y}) rotate(${this.angle})`); 
                    return; 
                }
                
                if(gameState.mode==='sandbox') this.aiSandbox(); else this.aiBattle();
                
                const m = 20;
                if(this.x<m){this.x=m;this.vx*=-1;} if(this.x>width-m){this.x=width-m;this.vx*=-1;}
                if(this.y<55){this.y=55;this.vy*=-1;} if(this.y>height-m){this.y=height-m;this.vy*=-1;}
                
                const da = Math.atan2(this.vy, this.vx)*180/Math.PI + 90;
                let df = da - this.angle; while(df<-180) df+=360; while(df>180) df-=360;
                this.angle += df*0.15;
                
                const wave = Math.sin(time*0.015)*4, wa = Math.cos(time*0.015)*4;
                const l1=document.getElementById(`${this.id}_l1`), l2=document.getElementById(`${this.id}_l2`), l3=document.getElementById(`${this.id}_l3`);
                const l4=document.getElementById(`${this.id}_l4`), l5=document.getElementById(`${this.id}_l5`), l6=document.getElementById(`${this.id}_l6`);
                if(l1) {
                    l1.setAttribute('d', `M-10 -8 Q${-18+wave} ${-14+wave*0.5},${-23+wave*0.8} -16`);
                    l2.setAttribute('d', `M-10 0 Q${-20+wa} 0,${-25+wa*0.8} 2`);
                    l3.setAttribute('d', `M-10 8 Q${-18+wave} ${14+wave*0.5},${-22+wave*0.8} 18`);
                    l4.setAttribute('d', `M10 -8 Q${18+wa} ${-14+wa*0.5},${23+wa*0.8} -16`);
                    l5.setAttribute('d', `M10 0 Q${20+wave} 0,${25+wave*0.8} 2`);
                    l6.setAttribute('d', `M10 8 Q${18+wa} ${14+wa*0.5},${22+wa*0.8} 18`);
                }
                this.dom.setAttribute('transform', `translate(${this.x},${this.y}) rotate(${this.angle})`);
            }
            aiBattle() {
                if(this.state==='eating') {
                    this.vx=0; this.vy=0; this.eatingTimer++;
                    if(this.eatingTimer%12===0) {
                        if (!gameState.shieldActive) {
                            gameState.targetHp = Math.max(0, gameState.targetHp-1);
                            updateTargetHp(); 
                        } else {
                            createSparkle(this.x, this.y, '#67e8f9');
                        }
                        playSound.eat(); createSparkle(this.x, this.y, '#fbbf24');
                    }
                    return;
                }
                const dx=targetX-this.x, dy=targetY-this.y, d=Math.hypot(dx,dy);
                const targetRadius = (gameState.scene === 'dining') ? 70 : 50;
                if(d < targetRadius) { this.state='eating'; this.eatingTimer=0; }
                else {
                    this.vx+=(dx/d)*0.25; this.vy+=(dy/d)*0.25;
                    const s = Math.hypot(this.vx,this.vy);
                    if(s>this.speed) { this.vx=(this.vx/s)*this.speed; this.vy=(this.vy/s)*this.speed; }
                    this.x+=this.vx; this.y+=this.vy;
                }
            }
            aiSandbox() {
                if(this.state==='eating') {
                    this.vx*=0.8; this.vy*=0.8; this.eatingTimer++;
                    if(this.targetCrumb && !crumbs.includes(this.targetCrumb)) { 
                        this.state='wandering'; this.targetCrumb=null; return; 
                    }
                    if(this.eatingTimer%20===0) {
                        playSound.eat(); createSparkle(this.x, this.y, '#fbbf24');
                        if(this.targetCrumb && this.targetCrumb.bite()) { 
                            this.state='wandering'; this.targetCrumb=null; 
                        }
                    }
                    this.x+=this.vx; this.y+=this.vy; return;
                }
                
                if(crumbs.length>0) {
                    let cls=null, md=Infinity; 
                    crumbs.forEach(c=>{ const d=Math.hypot(c.x-this.x,c.y-this.y); if(d<md){md=d;cls=c;} });
                    if(md<400 && cls){ this.targetCrumb=cls; this.state='chasing'; }
                }
                
                if(this.state==='chasing' && this.targetCrumb) {
                    const dx=this.targetCrumb.x-this.x, dy=this.targetCrumb.y-this.y, d=Math.hypot(dx,dy);
                    if(!crumbs.includes(this.targetCrumb)) { 
                        this.state='wandering'; this.targetCrumb=null; 
                    }
                    else if(d<25) { // 到達食物距離
                        this.state='eating'; this.eatingTimer=0; 
                        this.vx=0; this.vy=0; // 停下來吃
                    }
                    else { 
                        this.vx+=(dx/d)*0.4; this.vy+=(dy/d)*0.4; 
                        const s = Math.hypot(this.vx, this.vy);
                        if (s > this.speed) { this.vx = (this.vx/s)*this.speed; this.vy = (this.vy/s)*this.speed; }
                    }
                } else {
                    // 漫遊
                    if(Math.random()<0.04) { const a=Math.random()*Math.PI*2; this.vx=Math.cos(a)*this.speed; this.vy=Math.sin(a)*this.speed; }
                    const s=Math.hypot(this.vx,this.vy);
                    if(s<0.5){ this.vx=(Math.random()-0.5)*this.speed; this.vy=(Math.random()-0.5)*this.speed; }
                    else if(s>this.speed){ this.vx=(this.vx/s)*this.speed; this.vy=(this.vy/s)*this.speed; }
                }
                this.x+=this.vx; this.y+=this.vy;
            }
            die() {
                this.state='dead'; playSound.splat(); createSplatDebris(this.x, this.y, this.scale, this.angle, this.type);
                if(this.dom.parentNode) this.dom.parentNode.removeChild(this.dom);
            }
        }
        class Crumb {
            constructor(x,y){
                this.id='crumb_'+Math.random().toString(36).substr(2,9); this.x=x; this.y=y; this.hp=100;
                this.ms = 15+Math.random()*8; this.r = this.ms; this.dom = this.createDOM(); containers.crumbs.appendChild(this.dom);
            }
            createDOM(){
                const g=document.createElementNS('http://www.w3.org/2000/svg','g'); g.setAttribute('id',this.id); g.setAttribute('transform',`translate(${this.x},${this.y})`);
                const p=document.createElementNS('http://www.w3.org/2000/svg','path'); p.setAttribute('id',this.id+'_p'); p.setAttribute('d',this.getDP(this.r)); p.setAttribute('fill','url(#crumb-grad)'); p.setAttribute('stroke','#451a03');
                g.appendChild(p); return g;
            }
            getDP(r){ return `M 0 ${-r} C ${r*0.8} ${-r*0.9}, ${r*1.1} ${-r*0.2}, ${r} 0 C ${r*0.9} ${r*0.8}, ${r*0.3} ${r*1.1}, 0 ${r} C ${-r*0.8} ${r*0.9}, ${-r*0.9} ${r*0.2}, ${-r} 0 C ${-r*1.1} ${-r*0.3}, ${-r*0.6} ${-r*0.9}, 0 ${-r} Z`; }
            bite(){
                this.hp-=10; this.r=(this.hp/100)*this.ms;
                const p=document.getElementById(this.id+'_p');
                if(p) { if(this.hp<=0){this.destroy(); return true;} else p.setAttribute('d',this.getDP(this.r)); } return false;
            }
            destroy(){ crumbs=crumbs.filter(c=>c!==this); if(this.dom.parentNode) this.dom.parentNode.removeChild(this.dom); }
        }

        // ==========================================
        // Visual Effects
        // ==========================================
        function createSplatDebris(x,y,scale,angle,type) {
            const g = document.createElementNS('http://www.w3.org/2000/svg','g'); g.setAttribute('transform',`translate(${x},${y}) rotate(${angle})`);
            let jc='#a3e635', dc='#d8f1a0', sc='#451a03';
            if(type==='golden'){jc='#fbbf24';dc='#fef08a';sc='#d97706';}
            if(type==='tank'){jc='#4ade80';dc='#86efac';sc='#18181b';}
            if(type==='ninja'){jc='#9333ea';dc='#d8b4fe';sc='#000000';}
            g.innerHTML = `<ellipse cx="0" cy="0" rx="${25*scale}" ry="${15*scale}" fill="${jc}" opacity="0.7"/>
                           <path d="M-5 -5 C-15 -10,-18 8,-6 12 C-8 4,-4 -2,-5 -5" fill="${sc}" opacity="0.9"/>
                           <path d="M5 -5 C15 -10,18 8,6 12 C8 4,4 -2,5 -5" fill="${sc}" opacity="0.9"/>`;
            for(let i=0;i<6;i++){
                const a=Math.random()*Math.PI*2, d=(12+Math.random()*25)*scale;
                g.innerHTML += `<circle cx="${Math.cos(a)*d}" cy="${Math.sin(a)*d}" r="${1.5+Math.random()*3}" fill="${dc}" opacity="0.85"/>`;
            }
            containers.splats.appendChild(g); if(containers.splats.children.length>25) containers.splats.removeChild(containers.splats.firstChild);
        }
        function createCoinPop(x,y,count) {
            const t = document.createElementNS('http://www.w3.org/2000/svg','text');
            t.setAttribute('x',x); t.setAttribute('y',y-20); t.setAttribute('fill','#fbbf24'); t.setAttribute('font-weight','black');
            t.setAttribute('font-size','18px'); t.setAttribute('text-anchor','middle'); t.textContent=`+${count}`;
            t.style.transition='all 800ms ease-out'; containers.waves.appendChild(t);
            requestAnimationFrame(()=>{ t.setAttribute('y',y-65); t.setAttribute('opacity','0'); }); setTimeout(()=>t.remove(), 820);
        }
        function createWaveRing(x,y,color='rgba(255,255,255,0.5)') {
            const c = document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('cx',x); c.setAttribute('cy',y); c.setAttribute('r','5');
            c.setAttribute('fill','none'); c.setAttribute('stroke',color); c.setAttribute('stroke-width','2');
            c.style.transition='all 300ms cubic-bezier(0.1,0.8,0.3,1)'; containers.waves.appendChild(c);
            requestAnimationFrame(()=>{ c.setAttribute('r','45'); c.setAttribute('stroke-width','0.5'); c.setAttribute('stroke','rgba(255,255,255,0)'); }); setTimeout(()=>c.remove(), 310);
        }
        function createSparkle(x,y,color) {
            for(let i=0;i<4;i++){
                const p=document.createElementNS('http://www.w3.org/2000/svg','circle'); p.setAttribute('cx',x); p.setAttribute('cy',y); p.setAttribute('r',1+Math.random()*2); p.setAttribute('fill',color); containers.waves.appendChild(p);
                let px=x, py=y, vx=(Math.random()-0.5)*4, vy=(Math.random()-0.5)*4-1, l=0;
                function step(){ px+=vx; py+=vy; vy+=0.15; p.setAttribute('cx',px); p.setAttribute('cy',py); p.setAttribute('opacity',(15-l)/15); l++; if(l<15) requestAnimationFrame(step); else p.remove(); } step();
            }
        }
        function createSpray(x,y) {
            for(let i=0;i<8;i++){
                const c=document.createElementNS('http://www.w3.org/2000/svg','circle'); const a=Math.random()*Math.PI*2, d=Math.random()*30;
                c.setAttribute('cx',x+Math.cos(a)*d); c.setAttribute('cy',y+Math.sin(a)*d); c.setAttribute('r',8+Math.random()*12); c.setAttribute('fill','#10b981'); c.setAttribute('opacity','0.5');
                c.style.filter='blur(5px)'; c.style.transition='all 700ms ease-out'; containers.waves.appendChild(c);
                requestAnimationFrame(()=>{ c.setAttribute('r',115+Math.random()*20); c.setAttribute('opacity','0'); }); setTimeout(()=>c.remove(), 720);
            }
        }

        // ==========================================
        // Interaction
        // ==========================================
        function getPos(e) {
            const r = svg.getBoundingClientRect();
            if(e.touches && e.touches.length>0) return {x:e.touches[0].clientX-r.left, y:e.touches[0].clientY-r.top};
            return {x:e.clientX-r.left, y:e.clientY-r.top};
        }

        function triggerAttack(x, y, isSwipe=false) {
            if(!gameState.active || gameState.mode!=='battle') return;
            if(isSwipe && gameState.weapon!=='newspaper') return;

            const now = performance.now();
            if(gameState.cooldowns[gameState.weapon] > now) return;

            const conf = WEAPON_CONFIG[gameState.weapon]; const lvl = db.w_levels[gameState.weapon];
            let cd = Math.max(0, conf.baseCd - (lvl-1)*conf.cdReduction);
            if(cd>0) gameState.cooldowns[gameState.weapon] = now + (cd*1000);

            let dmg = conf.baseDmg + (lvl-1), radius = conf.baseRadius;
            showWeaponVisual(x, y);

            if (gameState.weapon === 'pesticide_bomb') {
                playSound.boom(); createSpray(x,y); createWaveRing(x,y);
                let hitAny=false;
                for(let i=roaches.length-1; i>=0; i--) {
                    if(Math.hypot(roaches[i].x-x, roaches[i].y-y) < radius) {
                        if(roaches[i].takeDamage(dmg,x,y)) {
                            const res = registerKillCombo(now, roaches[i].type);
                            createCoinPop(roaches[i].x, roaches[i].y, res.coins);
                            roaches[i].die(); roaches.splice(i,1);
                        }
                        hitAny=true;
                    }
                }
                if(!hitAny) triggerShake(); return;
            }

            // 特效與打擊感處理
            if(!isSwipe) { 
                if (gameState.weapon === 'golden_slipper') {
                    // 黃金流光打擊圈
                    createWaveRing(x, y, 'rgba(251,191,36,0.9)'); 
                    playSound.success();
                    createSparkle(x, y, '#fbbf24');
                } else {
                    createWaveRing(x,y); 
                    if(gameState.weapon==='newspaper') playSound.swish(); 
                }
            }

            let hitAny=false;
            if(isSwipe) {
                for(let i=roaches.length-1; i>=0; i--) {
                    if(Math.hypot(roaches[i].x-x, roaches[i].y-y) < radius && (!roaches[i].lastHit || now-roaches[i].lastHit>300)) {
                        roaches[i].lastHit = now;
                        if(roaches[i].takeDamage(dmg,x,y)) {
                            const res = registerKillCombo(now, roaches[i].type);
                            createCoinPop(roaches[i].x, roaches[i].y, res.coins);
                            roaches[i].die(); roaches.splice(i,1);
                        }
                        hitAny=true;
                    }
                }
            } else {
                let tgt=null, ti=-1, md=Infinity;
                for(let i=roaches.length-1; i>=0; i--) { const d=Math.hypot(roaches[i].x-x, roaches[i].y-y); if(d<radius && d<md){md=d; tgt=roaches[i]; ti=i;} }
                if(tgt) {
                    if(tgt.takeDamage(dmg,x,y)) {
                        const res = registerKillCombo(now, tgt.type);
                        createCoinPop(tgt.x, tgt.y, res.coins);
                        tgt.die(); roaches.splice(ti,1);
                    }
                    hitAny=true;
                }
            }
            updateBattleUI();
            if(!hitAny && !isSwipe) triggerShake();
        }

        let lastSwipe = {x:0,y:0};
        function onDown(e) {
            if(!gameState.active) return;
            if (e.target.closest('#bottom-bar') || e.target.closest('#top-bar') || e.target.closest('#pvp-traps-panel')) return;
            
            e.preventDefault(); 
            
            // 建立一個內部執行函數，用來處理「單個座標點」的遊戲邏輯
            function processInput(pos) {
                if(gameState.mode === 'battle') { 
                    lastSwipe = pos; 
                    triggerAttack(pos.x, pos.y, false); 
                }
                else {
                    if(gameState.tool === 'food') { 
                        playSound.eat(); 
                        crumbs.push(new Crumb(pos.x,pos.y)); 
                    }
                    else if(gameState.tool === 'hand') {
                        // 抓取小強
                        let f = null; 
                        for(let i=roaches.length-1; i>=0; i--){ 
                            if(Math.hypot(roaches[i].x-pos.x, roaches[i].y-pos.y) < 45) { // 加大抓取半徑
                                f = roaches[i]; break;
                            } 
                        }
                        if(f) {
                            dragTarget = f; dragTarget.state = 'dragged'; dragTarget.vx = 0; dragTarget.vy = 0; playSound.eat();
                        }
                        else { 
                            createWaveRing(pos.x, pos.y); 
                            roaches.forEach(r => { 
                                if(Math.hypot(r.x-pos.x, r.y-pos.y) < 120){
                                    const a = Math.atan2(r.y-pos.y, r.x-pos.x);
                                    r.vx = Math.cos(a)*r.speed*2; r.vy = Math.sin(a)*r.speed*2;
                                } 
                            }); 
                        }
                    } else if(gameState.tool === 'spray') { 
                        playSound.boom(); createSpray(pos.x, pos.y); 
                        roaches.forEach(r => {
                            const dx = r.x-pos.x, dy = r.y-pos.y, d = Math.hypot(dx,dy);
                            if(d < 100){ r.vx += (dx/d)*2; r.vy += (dy/d)*2; r.state = 'wandering'; r.targetCrumb = null; }
                        }); 
                    }
                }
            }

            // 🌟 核心魔法：判斷是多指觸控還是滑鼠單點
            if (e.type === 'touchstart') {
                // e.changedTouches 包含了「這一瞬間剛碰到螢幕」的所有手指
                for (let i = 0; i < e.changedTouches.length; i++) {
                    const touch = e.changedTouches[i];
                    // 將觸控點偽裝成普通事件，強制 getPos 讀取這根獨立手指的座標
                    const pos = getPos({ clientX: touch.clientX, clientY: touch.clientY });
                    processInput(pos); // 針對這根手指觸發攻擊
                }
            } else {
                // 如果是普通滑鼠點擊，走原本的邏輯
                const pos = getPos(e);
                processInput(pos);
            }
        }
        function onMove(e) {
            if(!gameState.active) return; const pos = getPos(e);
            if(gameState.mode==='battle' && gameState.weapon==='newspaper' && gameState.cooldowns['newspaper']<=performance.now()) {
                if(Math.hypot(pos.x-lastSwipe.x, pos.y-lastSwipe.y)>25) { triggerAttack(pos.x,pos.y,true); lastSwipe=pos; }
            } else if(gameState.mode==='sandbox') {
                if(gameState.tool==='hand' && dragTarget) { 
                    e.preventDefault(); 
                    // 計算拖曳甩動的速度差
                    dragTarget.vx = pos.x - dragTarget.x;
                    dragTarget.vy = pos.y - dragTarget.y;
                    dragTarget.x = pos.x; 
                    dragTarget.y = pos.y; 
                }
                else if(gameState.tool==='spray' && Math.random()<0.2) { 
                    createSpray(pos.x,pos.y); 
                    roaches.forEach(r=>{
                        const dx=r.x-pos.x, dy=r.y-pos.y, d=Math.hypot(dx,dy);
                        if(d<100){r.vx+=(dx/d)*2;r.vy+=(dy/d)*2;r.state='wandering';r.targetCrumb=null;}
                    }); 
                }
            }
        }
        function onUp(e) { 
            if(dragTarget) {
                dragTarget.state='wandering';
                // 甩動拋出物理限速
                let throwSpeed = Math.hypot(dragTarget.vx, dragTarget.vy);
                if (throwSpeed > 15) {
                    dragTarget.vx = (dragTarget.vx/throwSpeed)*15;
                    dragTarget.vy = (dragTarget.vy/throwSpeed)*15;
                } else if (throwSpeed < 1) {
                    dragTarget.vx = (Math.random()-0.5)*8;
                    dragTarget.vy = (Math.random()-0.5)*8;
                }
                dragTarget=null;
            } 
        }

        svg.addEventListener('mousedown', onDown); svg.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
        svg.addEventListener('touchstart', onDown, {passive:false}); svg.addEventListener('touchmove', onMove, {passive:false}); window.addEventListener('touchend', onUp);

        // ==========================================
        // Rendering & Loop
        // ==========================================
        function showWeaponVisual(x,y) {
            const ws = document.getElementById('weapon-slipper');
            let content = '', a=-30;
            if(gameState.weapon==='slipper') content=`<svg viewBox="0 0 100 100" class="w-full h-full"><path d="M 30 70 C 25 50, 30 20, 50 15 C 70 20, 75 50, 70 70 C 65 85, 50 90, 50 90 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3"/></svg>`;
            if(gameState.weapon==='grandma_slipper') content=`<svg viewBox="0 0 100 100" class="w-full h-full scale-125"><path d="M 30 70 C 25 50, 30 20, 50 15 C 70 20, 75 50, 70 70 C 65 85, 50 90, 50 90 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/></svg>`;
            if(gameState.weapon==='newspaper'){ content=`<svg viewBox="0 0 100 100" class="w-full h-full rotate-12"><rect x="35" y="10" width="30" height="80" rx="4" fill="#e5e7eb" stroke="#9ca3af" stroke-width="2"/></svg>`; a=-45; }
            if(gameState.weapon==='pesticide_bomb'){ content=`<svg viewBox="0 0 100 100" class="w-full h-full scale-110"><rect x="35" y="30" width="30" height="55" rx="8" fill="#10b981" stroke="#047857" stroke-width="3"/></svg>`; a=15; }
            if(gameState.weapon==='golden_slipper') {
                content=`<svg viewBox="0 0 100 100" class="w-full h-full scale-125 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"><path d="M 30 70 C 25 50, 30 20, 50 15 C 70 20, 75 50, 70 70 C 65 85, 50 90, 50 90 Z" fill="url(#super-gold-grad)" stroke="#b45309" stroke-width="3"/></svg>`;
            }
            ws.innerHTML=content; ws.style.left=`${x-48}px`; ws.style.top=`${y-48}px`; ws.style.transform=`scale(1.2) rotate(${a}deg)`; ws.style.opacity='1';
            setTimeout(()=>{ws.style.transform=`scale(0.8) rotate(0deg)`;}, 60); setTimeout(()=>{ws.style.opacity='0';}, 250);
        }

        function triggerShake() { const c=document.getElementById('game-container'); c.classList.remove('shake-effect'); void c.offsetWidth; c.classList.add('shake-effect'); }
        
        function updateTargetHp() {
            if(gameState.mode==='sandbox') return;
            
            // Standard update
            const bar = document.getElementById('target-hp-bar'); 
            if(bar) {
                bar.style.width = `${gameState.targetHp}%`;
                bar.className = `h-full w-full transition-all duration-300 ${gameState.targetHp<35?'bg-gradient-to-r from-red-600 to-red-500':'bg-gradient-to-r from-red-500 to-emerald-500'}`;
            }

            // PVP Dual health bar update
            if (pvpState.active) {
                const myHpBar = document.getElementById('pvp-my-hp-bar');
                const myHpText = document.getElementById('pvp-my-hp-text');
                if (myHpBar && myHpText) {
                    myHpBar.style.width = `${gameState.targetHp}%`;
                    myHpText.textContent = `${gameState.targetHp}%`;
                }

                // Send real-time health sync message to broker
                sendPvpMsg({
                    type: 'hp_sync',
                    sender: pvpState.myPlayerId,
                    hp: gameState.targetHp
                });

                if (gameState.targetHp <= 0) {
                    gameState.active = false;
                    pvpState.active = false;
                    // Inform broker of our loss (which translates to opponent's win)
                    sendPvpMsg({
                        type: 'game_over_lose',
                        sender: pvpState.myPlayerId
                    });
                    triggerPvPLose();
                    return;
                }
            }

            if(Math.random()<0.25) {
                playSound.damage(); triggerShake();
                const dm = document.getElementById('damage-mask'); dm.style.opacity='1'; setTimeout(()=>dm.style.opacity='0', 150);
            }

            if(gameState.targetHp<=0 && !pvpState.active) {
                gameState.active=false; playSound.damage();
                document.getElementById('game-over-modal').classList.remove('hidden');
                document.getElementById('result-score').textContent = gameState.score;
                document.getElementById('result-coins').textContent = gameState.sessionCoins;
                switchBGM(bgm);
			}
        }

        function updateBattleUI() {
            document.getElementById('score-text').textContent = gameState.score;
            document.querySelectorAll('.weapon-btn').forEach(btn => {
                const w = btn.dataset.w;
                if(w === gameState.weapon) { btn.classList.replace('bg-zinc-800','bg-amber-600'); btn.classList.replace('border-zinc-700','border-amber-400'); }
                else { btn.classList.replace('bg-amber-600','bg-zinc-800'); btn.classList.replace('border-amber-400','border-zinc-700'); }
                const cdOverlay = document.getElementById(`cd-${w}`);
                if(cdOverlay) {
                    const left = gameState.cooldowns[w] - performance.now();
                    if(left>0) { cdOverlay.style.opacity='1'; cdOverlay.textContent=(left/1000).toFixed(1)+'s'; } else { cdOverlay.style.opacity='0'; }
                }
            });
        }

        function spawnRoach() {
            let rx,ry; 
            if(gameState.mode === 'sandbox') {
                // 生態箱內直接向中間產生，避免在畫面外被卡住
                rx = width/2 + (Math.random()-0.5)*(width*0.8);
                ry = height/2 + (Math.random()-0.5)*(height*0.8);
            } else {
                if(Math.random()<0.5){rx=Math.random()<0.5?-30:width+30; ry=65+Math.random()*(height-85);}
                else{rx=Math.random()*width; ry=Math.random()<0.5?-30:height+30; if(ry<55)ry=65;}
            }
            
            roaches.push(new Cockroach(rx,ry));
            if(gameState.mode==='sandbox') document.getElementById('roach-count-text').textContent = roaches.length;
        }

        function clearEntities() {
            roaches.forEach(r=>{if(r.dom.parentNode)r.dom.parentNode.removeChild(r.dom)}); roaches=[];
            crumbs.forEach(c=>{if(c.dom.parentNode)c.dom.parentNode.removeChild(c.dom)}); crumbs=[];
            containers.splats.innerHTML=''; containers.waves.innerHTML=''; dragTarget=null;
        }

        function buildInGameWeaponBar() {
            const c = document.getElementById('battle-weapons'); c.innerHTML='';
            db.weapons.forEach(w => {
                const conf = WEAPON_CONFIG[w];
                c.innerHTML += `
                    <button data-w="${w}" onclick="gameState.weapon='${w}'; updateBattleUI();" class="weapon-btn flex-1 py-1.5 px-1 rounded-xl border border-zinc-700 bg-zinc-800 font-bold text-xs flex flex-col items-center transition select-none relative overflow-hidden">
                        <i class="fa-solid ${conf.icon} text-lg sm:text-xl ${conf.color}"></i>
                        <span class="text-[10px] sm:text-[11px] text-white mt-1 truncate w-full text-center">${conf.name}</span>
                        <div id="cd-${w}" class="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-mono text-sm opacity-0 pointer-events-none transition-opacity"></div>
                    </button>
                `;
            });
            gameState.weapon = db.weapons.includes(gameState.weapon) ? gameState.weapon : 'slipper';
            updateBattleUI();
        }

        function startGameSession() {
            clearEntities(); gameState.score=0; gameState.sessionCoins=0; gameState.targetHp=100; gameState.combo=0;
            gameState.cooldowns = { slipper:0, grandma_slipper:0, newspaper:0, pesticide_bomb:0, golden_slipper:0 };
            gameState.shieldActive = false; gameState.shieldEndTime = 0;
            
            ['kitchen', 'living', 'dining'].forEach(s => {
                const el = document.getElementById(`shield-effect-${s}`);
                if (el) el.classList.add('hidden');
            });
            
            buildInGameWeaponBar(); updateTargetHp(); updateBattleUI(); updateItemUI();
            document.getElementById('combo-display').classList.add('hidden');
            document.getElementById('shield-cd-overlay').style.opacity = '0';
            
            gameState.active=true; playSound.success();
            gameState.timeSpeed = 5; 
			switchBGM(fireBgm);
        }

        function startSandboxSession() {
            clearEntities(); gameState.active=true; playSound.success();
            for(let i=0;i<10;i++) spawnRoach(); 
            document.getElementById('roach-count-text').textContent = roaches.length;
            gameState.timeSpeed = 1;
        }

        let lastTime = performance.now();
        function loop(timestamp) {
            const dt = timestamp - lastTime; lastTime = timestamp;
            if(gameState.active) {
                updateTime(dt);
                
                if(gameState.mode === 'battle') {
                    if (gameState.shieldActive) {
                        const timeLeft = gameState.shieldEndTime - timestamp;
                        const cdOverlay = document.getElementById('shield-cd-overlay');
                        
                        if (timeLeft <= 0) {
                            gameState.shieldActive = false;
                            const shieldEl = document.getElementById(`shield-effect-${gameState.scene}`);
                            if (shieldEl) shieldEl.classList.add('hidden');
                            cdOverlay.style.opacity = '0';
                        } else {
                            cdOverlay.textContent = (timeLeft / 1000).toFixed(1);
                        }
                    }

                    updateBattleUI();
                    if(timestamp - lastSpawnTime > spawnInterval) {
                        spawnRoach(); lastSpawnTime = timestamp;
                        const nightMultiplier = gameState.isNight ? 0.7 : 1.0;
                        spawnInterval = Math.max(250, (2000 - (gameState.score * 5) - (db.level * 20)) * nightMultiplier);
                    }
                    if(gameState.combo > 1 && timestamp - gameState.lastKillTime > 2000) {
                        gameState.combo = 0; document.getElementById('combo-display').classList.add('hidden');
                    }
                }
                roaches.forEach(r => r.update(timestamp));
            }
            requestAnimationFrame(loop);
        }

        // Init click handlers & states
        document.addEventListener('contextmenu', e=>e.preventDefault());
        document.getElementById('add-roach-btn').addEventListener('click', e=>{e.stopPropagation(); spawnRoach();});
        document.getElementById('clear-all-btn').addEventListener('click', e=>{e.stopPropagation(); clearEntities(); document.getElementById('roach-count-text').textContent=0;});
        
        const tools = document.querySelectorAll('.tool-btn');
        tools.forEach(b=>{
            b.addEventListener('click', ()=>{
                tools.forEach(tb=>{tb.classList.remove('bg-amber-600','bg-blue-600','bg-emerald-600','text-white'); tb.classList.add('bg-zinc-800','text-zinc-400');});
                if(b.id==='tool-food'){gameState.tool='food';b.classList.add('bg-amber-600','text-white');}
                if(b.id==='tool-hand'){gameState.tool='hand';b.classList.add('bg-blue-600','text-white');}
                if(b.id==='tool-spray'){gameState.tool='spray';b.classList.add('bg-emerald-600','text-white');}
            });
        });

        function initLobbyAnimation() {
            const canvas = document.getElementById('lobby-anim-canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let lWidth = (canvas.width = window.innerWidth);
            let lHeight = (canvas.height = window.innerHeight);

            window.addEventListener('resize', () => {
                lWidth = canvas.width = window.innerWidth;
                lHeight = canvas.height = window.innerHeight;
            });

            const particles = [];
            const shadows = [];

            function spawnShadowBug() {
                if (shadows.length > 4) return;
                const size = 12 + Math.random() * 18;
                shadows.push({
                    x: Math.random() * lWidth,
                    y: lHeight + 30,
                    vx: (Math.random() - 0.5) * 2,
                    vy: - (1 + Math.random() * 1.5),
                    size: size,
                    angle: 0,
                    legsWave: Math.random() * 10
                });
            }

            for (let i = 0; i < 25; i++) {
                particles.push({
                    x: Math.random() * lWidth,
                    y: Math.random() * lHeight,
                    r: 1 + Math.random() * 2.5,
                    vy: - (0.05 + Math.random() * 0.25),
                    vx: (Math.random() - 0.5) * 0.15,
                    opacity: 0.15 + Math.random() * 0.5
                });
            }

            function animateLobby() {
                const lobbyScreen = document.getElementById('lobby-screen');
                if (lobbyScreen && !lobbyScreen.classList.contains('hidden')) {
                    ctx.clearRect(0, 0, lWidth, lHeight);

                    particles.forEach(p => {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(234, 179, 8, ${p.opacity})`;
                        ctx.fill();

                        p.y += p.vy;
                        p.x += p.vx;
                        if (p.y < -10) {
                            p.y = lHeight + 10;
                            p.x = Math.random() * lWidth;
                        }
                    });

                    if (Math.random() < 0.006) spawnShadowBug();
                    shadows.forEach((s, idx) => {
                        s.x += s.vx;
                        s.y += s.vy;
                        s.angle = Math.atan2(s.vy, s.vx) + Math.PI / 2;
                        s.legsWave += 0.25;

                        ctx.save();
                        ctx.translate(s.x, s.y);
                        ctx.rotate(s.angle);
                        ctx.fillStyle = 'rgba(12, 10, 8, 0.35)';
                        ctx.strokeStyle = 'rgba(12, 10, 8, 0.3)';
                        ctx.lineWidth = 1.5;

                        const legOffset = Math.sin(s.legsWave) * 3;
                        for (let i = -1; i <= 1; i++) {
                            ctx.beginPath();
                            ctx.moveTo(-s.size * 0.3, i * s.size * 0.3);
                            ctx.lineTo(-s.size * 0.6 - legOffset, i * s.size * 0.3 - 3);
                            ctx.stroke();

                            ctx.beginPath();
                            ctx.moveTo(s.size * 0.3, i * s.size * 0.3);
                            ctx.lineTo(s.size * 0.6 + legOffset, i * s.size * 0.3 - 3);
                            ctx.stroke();
                        }

                        ctx.beginPath();
                        ctx.arc(-2, -s.size * 0.5, s.size * 0.35, Math.PI, Math.PI * 1.5);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(2, -s.size * 0.5, s.size * 0.35, 0, -Math.PI * 0.5);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.ellipse(0, 0, s.size * 0.25, s.size * 0.5, 0, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(0, -s.size * 0.52, s.size * 0.18, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.restore();

                        if (s.y < -50 || s.x < -50 || s.x > lWidth + 50) {
                            shadows.splice(idx, 1);
                        }
                    });
                }
                requestAnimationFrame(animateLobby);
            }
            animateLobby();
        }

        // ==========================================
        // 🎵 MP3 背景音樂系統 (支援商城多軌道切換)
        // ==========================================
        
        // 1. 宣告兩首不同的音樂
        const bgm = new Audio('bgm.mp3'); 
        bgm.loop = true;  
        bgm.volume = 0.4; 

        const shopBgm = new Audio('shop_bgm.mp3'); // 🌟 新增商城音樂
        shopBgm.loop = true;
        shopBgm.volume = 0.4; // 通常商城音樂可以調稍微小聲、和諧一點

        const pvpBgm = new Audio('pvp_bgm.mp3'); 
        pvpBgm.loop = true;  
        pvpBgm.volume = 0.4; 

        const fireBgm = new Audio('fire_bgm.mp3'); 
        fireBgm.loop = true;  
        fireBgm.volume = 0.4;

        // 2. 智慧狀態追蹤
        let bgmState = {
            muted: true,
            currentAudio: bgm // 🌟 核心：紀錄「目前」應該播哪一首，預設是普通BGM
        };

        // 3. 核心魔法：專門用來切換音樂軌道的函數
       function switchBGM(targetAudio) {
            // 如果本來就在播這首，就不用重頭播
            if (bgmState.currentAudio === targetAudio && !bgmState.currentAudio.paused) {
                return;
            }

            // 讓目前的音樂暫停，並重設時間
            if (bgmState.currentAudio) {
                bgmState.currentAudio.pause();
                bgmState.currentAudio.currentTime = 0;
            }
            
            // 指向新的音樂軌道
            bgmState.currentAudio = targetAudio;
            
            // 如果玩家「沒有靜音」，就立刻播放
            if (!bgmState.muted && bgmState.currentAudio) {
                bgmState.currentAudio.play().catch(e => console.log("切換音樂被瀏覽器攔截"));
            }
        }

        // 4. 切換音樂開關與 UI 按鈕的函數 (已升級支援多軌道)
        function toggleMusic() {
            bgmState.muted = !bgmState.muted;
            
            if (bgmState.muted) {
                // 靜音時，保險起見把兩首全部都暫停
                bgm.pause();
                shopBgm.pause();
            } else {
                // 解除靜音時，只播放「目前指定」的那首音樂
                bgmState.currentAudio.play().catch(e => console.log("等待玩家互動後才能播放 BGM"));
            }

            // (下方完全保留你原本切換大廳與遊戲中喇叭圖示的 UI 邏輯...)
            const lobbyBtn = document.getElementById('lobby-music-btn');
            const gameBtn = document.getElementById('game-music-btn');
            if (bgmState.muted) {
                if (lobbyBtn) {
                    lobbyBtn.className = "text-zinc-500 hover:text-zinc-400 p-1 bg-zinc-800/80 rounded-full border border-zinc-700/50 flex items-center justify-center w-6 h-6 z-20 pointer-events-auto";
                    lobbyBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
                }
                if (gameBtn) {
                    gameBtn.className = "bg-black/70 hover:bg-black text-zinc-500 w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center shadow-lg transition pointer-events-auto";
                    gameBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
                }
            } else {
                if (lobbyBtn) {
                    lobbyBtn.className = "text-yellow-500 hover:text-yellow-400 p-1 bg-zinc-800/80 rounded-full border border-zinc-700/50 flex items-center justify-center w-6 h-6 z-20 pointer-events-auto";
                    lobbyBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                }
                if (gameBtn) {
                    gameBtn.className = "bg-black/70 hover:bg-black text-yellow-500 w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center shadow-lg transition pointer-events-auto";
                    gameBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                }
            }
        }

        // ==========================================
// 🚀 多點觸控優化模組 (支援左手換武、右手打怪)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // 鎖定下方工具列 (包含武器、道具) 裡所有可以點擊的元素
    const bottomBarItems = document.querySelectorAll('#bottom-bar .cursor-pointer, #bottom-bar button, .weapon-btn');
    
    bottomBarItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            e.preventDefault(); // 阻止瀏覽器預設的單指等待行為
            this.click();       // 強制立刻觸發原本寫好的換武器/用道具邏輯
        }, { passive: false });
    });
});

        const hours = Math.floor(gameState.time / 60); const mins = Math.floor(gameState.time % 60);
        const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        document.getElementById('lobby-time-display').innerHTML = `<i class="fa-regular fa-sun mr-1 text-yellow-400"></i>${timeStr}`;

		// 每 3 秒檢查清理一次斷線玩家並重繪 UI
		setInterval(updateOnlinePlayersUI, 3000);

        updateLobbyUI(); 
		initMQTT();
        window.dispatchEvent(new Event('resize')); 
        initLobbyAnimation();
		requestAnimationFrame(loop);
		
		
