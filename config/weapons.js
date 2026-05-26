const WEAPON_CONFIG = {
    slipper: {
        name: '藍色拖鞋', icon: 'fa-shoe-prints', color: 'text-blue-400', glow: 'rgba(59,130,246,0.8)',
        baseDmg: 1, baseRadius: 35, baseCd: 0, cdReduction: 0, baseCost: 0, upgradeBase: 50,
        svg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="33" rx="14" ry="9" fill="#1e3a5f" opacity="0.25"/><ellipse cx="24" cy="32" rx="14" ry="9" fill="#3b82f6"/><path d="M13 32Q24 36 35 32" fill="none" stroke="#2563eb" stroke-width="1.5"/><path d="M14 29Q24 33 34 29" fill="none" stroke="#2563eb" stroke-width="1"/><path d="M16 32C14 22 18 15 24 15" fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round"/><path d="M32 32C30 22 26 15 24 15" fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="16" r="2.5" fill="#93c5fd"/></svg>'
    },
    grandma_slipper: {
        name: '阿嬤紅拖', icon: 'fa-shoe-prints', color: 'text-red-500', glow: 'rgba(239,68,68,0.8)',
        baseDmg: 2, baseRadius: 60, baseCd: 0.5, cdReduction: 0.05, baseCost: 50, upgradeBase: 100,
        svg: '<svg viewBox="0 0 48 48"><path d="M14 34C10 28 12 18 20 16C28 14 38 18 36 28C34 38 24 40 20 38Z" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/><path d="M12 32C14 28 16 24 20 22" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linecap="round"/><path d="M22 20C26 18 30 20 32 24" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linecap="round"/><path d="M16 30C18 26 22 24 26 26" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/><circle cx="24" cy="22" r="2" fill="#f87171"/><circle cx="20" cy="26" r="1.5" fill="#f87171"/><circle cx="28" cy="26" r="1.5" fill="#f87171"/></svg>'
    },
    newspaper: {
        name: '橫掃報紙', icon: 'fa-newspaper', color: 'text-gray-300', glow: 'rgba(229,231,235,0.8)',
        baseDmg: 1, baseRadius: 45, baseCd: 0.6, cdReduction: 0.04, baseCost: 120, upgradeBase: 150,
        svg: '<svg viewBox="0 0 48 48"><rect x="8" y="6" width="32" height="38" rx="2" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1.5"/><rect x="11" y="9" width="12" height="5" rx="1" fill="#dc2626"/><rect x="11" y="9" width="26" height="5" rx="1" fill="#1f2937" opacity="0.8"/><rect x="11" y="9" width="12" height="5" rx="1" fill="#dc2626" opacity="0.9"/><path d="M11 18h20M11 21h16M11 24h22M11 27h18M11 30h20M11 33h14" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round"/><path d="M33 18h5M33 21h5M33 24h5" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round"/></svg>'
    },
    pesticide_bomb: {
        name: '化學毒霧', icon: 'fa-spray-can', color: 'text-emerald-400', glow: 'rgba(16,185,129,0.8)',
        baseDmg: 5, baseRadius: 110, baseCd: 3.0, cdReduction: 0.2, baseCost: 250, upgradeBase: 250,
        svg: '<svg viewBox="0 0 48 48"><rect x="14" y="18" width="20" height="26" rx="4" fill="#10b981" stroke="#047857" stroke-width="1.5"/><rect x="14" y="22" width="20" height="8" fill="#059669" opacity="0.5"/><rect x="18" y="36" width="12" height="4" rx="2" fill="#34d399" opacity="0.5"/><rect x="20" y="6" width="8" height="10" rx="2" fill="#6ee7b7" stroke="#047857" stroke-width="1"/><rect x="22" y="4" width="4" height="3" rx="1" fill="#34d399"/><circle cx="24" cy="30" r="3" fill="#fef08a"/><path d="M21 30h6M24 27v6" stroke="#d97706" stroke-width="1.5"/></svg>'
    },
    golden_slipper: {
        name: '至尊黃金拖鞋', icon: 'fa-shoe-prints', color: 'text-yellow-400', glow: 'rgba(251,191,36,0.9)',
        baseDmg: 8, baseRadius: 50, baseCd: 0.16, cdReduction: 0.02, baseCost: 3000, upgradeBase: 500,
        svg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="33" rx="14" ry="9" fill="#92400e" opacity="0.3"/><ellipse cx="24" cy="32" rx="14" ry="9" fill="#f59e0b"/><ellipse cx="24" cy="31" rx="11" ry="6" fill="#fbbf24"/><path d="M13 32Q24 36 35 32" fill="none" stroke="#d97706" stroke-width="1.5"/><path d="M16 32C14 22 18 15 24 15" fill="none" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/><path d="M32 32C30 22 26 15 24 15" fill="none" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="16" r="3" fill="#f59e0b"/><path d="M10 18L12 20M10 20L12 18" stroke="#fef08a" stroke-width="1.5" stroke-linecap="round"/><path d="M36 22L38 24M36 24L38 22" stroke="#fef08a" stroke-width="1.5" stroke-linecap="round"/><path d="M38 34L40 36M38 36L40 34" stroke="#fef08a" stroke-width="1.5" stroke-linecap="round"/></svg>'
    }
};
