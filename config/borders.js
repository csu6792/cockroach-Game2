const BORDER_CONFIG = {
    none: { name: '無特效外框', cost: 0, desc: '普通的簡約邊框樣式', type: 'none', class: '' },
    red_fire: { name: '烈焰紅 (紅焰)', cost: 1000, desc: '高熱火焰，在大廳閃耀灼熱烈火的光芒！', type: 'fire', class: 'border-red-fire' },
    blue_frost: { name: '極冰藍 (藍焰)', cost: 1500, desc: '酷寒極冰的湛藍色火焰特效', type: 'fire', class: 'border-blue-frost' },
    purple_demon: { name: '暗魔紫 (紫焰)', cost: 2000, desc: '幽暗深邃的魔神紫色火焰特效', type: 'fire', class: 'border-purple-demon' },
    rainbow_nebula: { name: '星雲虹光 (炫彩)', cost: 10000, desc: '尊貴彩虹炫光火焰！頂級玩家的奢華首選', type: 'rainbow', class: 'border-rainbow-nebula' },
    aurora_cosmic: { name: '宇宙極光 (極光霓彩)', cost: 15000, desc: '極光般的緩慢極速霓虹漸變，唯美至極', type: 'rainbow', class: 'border-aurora-cosmic' },
    gacha_mythic_border: { 
        name: '虛空混沌·流光邊框', 
        cost: 0, 
        desc: '扭蛋機專屬神話大獎！', 
        type: 'mythic', 
        class: 'border-4 border-transparent bg-gradient-to-r from-purple-600 via-pink-500 via-red-500 to-yellow-500 bg-[length:400%_400%] shadow-[0_0_35px_rgba(236,72,153,0.8)]',
        source: 'gacha'
    },
    gacha_mythic_border2: { 
        name: '深淵凝視·暗黑邊框', 
        cost: 0, 
        desc: '扭蛋機專屬神話大獎！', 
        type: 'mythic', 
        class: 'border-4 border-transparent bg-gradient-to-r from-purple-900 via-zinc-900 to-slate-900 bg-[length:400%_400%] shadow-[0_0_35px_rgba(147,51,234,0.8)]',
        source: 'gacha'
    }
};
