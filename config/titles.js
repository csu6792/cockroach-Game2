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
    { id: 'gacha_mythic_title2', name: '暗夜主宰', level: 999, color: 'from-purple-400 via-fuchsia-500 to-indigo-600 tracking-widest drop-shadow-[0_2px_10px_rgba(147,51,234,0.9)]', source: 'gacha' },
    { id: 'neon_killer', name: '蟑螂終結者', level: 999, color: 'from-cyan-400 to-blue-500 text-shadow-neon', source: 'shop' },
    { id: 'gold_god', name: '黃金拖鞋神', level: 999, color: 'from-yellow-400 to-amber-200 animate-pulse', source: 'shop' }
];

const TITLE_SHOP_CONFIG = {
    neon_killer: { id: 'neon_killer', name: '蟑螂終結者', cost: 10000, class: 'title-neon', desc: '閃耀霓虹光芒的尊貴稱號' },
    gold_god: { id: 'gold_god', name: '黃金拖鞋神', cost: 15000, class: 'title-gold-shine', desc: '極致奢華的流動金光稱號' }
};
