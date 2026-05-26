const GACHA_CONFIG = {
    cost: 1000,
    prizes: [
        {
            id: 'gacha_mythic_border',
            name: '虛空混沌·流光邊框',
            weight: 1,
            category: 'border',
            rarityLabel: '🌌【神話降臨 · 限定外框】🌌',
            rarityClass: 'text-sm font-black tracking-widest text-pink-400 animate-pulse',
            glowClass: 'absolute inset-0 bg-pink-500/40 blur-3xl rounded-full animate-ping',
            duplicateCoins: 5000,
            rewardTarget: 'unlocked_borders',
            displayBgClass: 'w-56 bg-black border-4 border-transparent bg-gradient-to-r from-purple-600 via-pink-500 via-red-500 to-yellow-500 bg-[length:400%_400%] shadow-[0_0_35px_rgba(236,72,153,0.8)] p-4 rounded-2xl flex flex-col items-center justify-center animate-bounce',
            displayClassName: 'border-4 border-transparent bg-gradient-to-r from-purple-600 via-pink-500 via-red-500 to-yellow-500 bg-[length:400%_400%] shadow-[0_0_35px_rgba(236,72,153,0.8)]',
            displayDesc: '已解鎖！可至商城或自選區裝備'
        },
        {
            id: 'gacha_mythic_title',
            name: '天使降臨',
            weight: 1,
            category: 'title',
            rarityLabel: '👑【天命覺醒 · 神話稱號】👑',
            rarityClass: 'text-sm font-black tracking-widest text-yellow-400 animate-pulse',
            glowClass: 'absolute inset-0 bg-yellow-500/40 blur-3xl rounded-full animate-ping',
            duplicateCoins: 5000,
            rewardTarget: 'unlocked_shop_titles',
            displayBgClass: 'w-56 bg-zinc-900 border border-yellow-500 p-4 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_25px_rgba(234,179,8,0.5)]',
            displayClassName: 'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-500 via-red-500 to-purple-600 bg-[length:200%_auto] tracking-widest drop-shadow-[0_2px_10px_rgba(245,158,11,0.9)]',
            displayDesc: '已解鎖！可至大廳編輯裝備'
        },
        {
            id: 'gacha_mythic_border2',
            name: '深淵凝視·暗黑邊框',
            weight: 2,
            category: 'border',
            rarityLabel: '🌌【神話降臨 · 暗黑邊框】🌌',
            rarityClass: 'text-sm font-black tracking-widest text-purple-400 animate-pulse',
            glowClass: 'absolute inset-0 bg-purple-500/40 blur-3xl rounded-full animate-ping',
            duplicateCoins: 3000,
            rewardTarget: 'unlocked_borders',
            displayBgClass: 'w-56 bg-black border-4 border-transparent bg-gradient-to-r from-purple-900 via-zinc-900 to-slate-900 bg-[length:400%_400%] shadow-[0_0_35px_rgba(147,51,234,0.8)] p-4 rounded-2xl flex flex-col items-center justify-center animate-bounce',
            displayClassName: 'border-4 border-transparent bg-gradient-to-r from-purple-900 via-zinc-900 to-slate-900 bg-[length:400%_400%] shadow-[0_0_35px_rgba(147,51,234,0.8)]',
            displayDesc: '已解鎖！可至商城或自選區裝備'
        },
        {
            id: 'gacha_mythic_title2',
            name: '暗夜主宰',
            weight: 2,
            category: 'title',
            rarityLabel: '👑【天命覺醒 · 暗夜稱號】👑',
            rarityClass: 'text-sm font-black tracking-widest text-purple-400 animate-pulse',
            glowClass: 'absolute inset-0 bg-purple-500/40 blur-3xl rounded-full animate-ping',
            duplicateCoins: 3000,
            rewardTarget: 'unlocked_shop_titles',
            displayBgClass: 'w-56 bg-zinc-900 border border-purple-500 p-4 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_25px_rgba(147,51,234,0.5)]',
            displayClassName: 'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-600 bg-[length:200%_auto] tracking-widest drop-shadow-[0_2px_10px_rgba(147,51,234,0.9)]',
            displayDesc: '已解鎖！可至大廳編輯裝備'
        },
        {
            id: 'gacha_epic_coins',
            name: '金幣 + 500',
            weight: 10,
            category: 'coins',
            rarityLabel: '💰【小確幸 · 金幣加碼】💰',
            rarityClass: 'text-xs font-black tracking-widest text-yellow-400',
            glowClass: 'absolute inset-0 bg-yellow-500/20 blur-xl rounded-full',
            rewardCoins: 500,
            displayIcon: '🪙',
            displayDesc: '金幣 + 500'
        },
        {
            id: 'consolation_exp',
            name: '經驗值 + 100',
            weight: 84,
            category: 'exp',
            rarityLabel: '💨【銘謝惠顧 · 下次好運】💨',
            rarityClass: 'text-xs font-black tracking-widest text-zinc-500',
            glowClass: 'absolute inset-0 bg-zinc-500/10 blur-md rounded-full',
            rewardExp: 100,
            displayIcon: '🍃',
            displayDesc: '經驗值 + 100'
        }
    ]
};

// 保持向後相容（updateLobbyUI 等處仍使用 GACHA_PRIZES）
const GACHA_PRIZES = {};
['gacha_mythic_border', 'gacha_mythic_border2'].forEach(id => {
    const p = GACHA_CONFIG.prizes.find(x => x.id === id);
    if (p) GACHA_PRIZES[id] = { id: p.id, name: p.name, className: p.displayClassName };
});
['gacha_mythic_title', 'gacha_mythic_title2'].forEach(id => {
    const p = GACHA_CONFIG.prizes.find(x => x.id === id);
    if (p) GACHA_PRIZES[id] = { id: p.id, name: p.name, className: p.displayClassName };
});
GACHA_PRIZES.border = GACHA_PRIZES['gacha_mythic_border'];
GACHA_PRIZES.title = GACHA_PRIZES['gacha_mythic_title'];
