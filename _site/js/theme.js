(function(){
    function setCookie(name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        var v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return v ? decodeURIComponent(v.pop()) : null;
    }

    function applyTheme(mode) {
        var s1 = document.getElementById('style1');
        var s2 = document.getElementById('style2');
        if (!s1) return;
        if (mode === 'dark') {
            s1.href = 'css/colors/dark-mode.css';
            if (s2) s2.disabled = true;
        } else {
            s1.href = 'css/colors/light-mode.css';
            if (s2) s2.disabled = true;
        }
        var chk = document.getElementById('flexSwitchCheckDefault');
        if (chk) chk.checked = (mode === 'dark');
    }

    function setAndApply(mode) {
        setCookie('site_theme', mode, 365);
        applyTheme(mode);
    }

    function toggle() {
        var cur = getCookie('site_theme') || 'light';
        var next = cur === 'dark' ? 'light' : 'dark';
        setAndApply(next);
    }

    window.toggle = toggle;

    document.addEventListener('DOMContentLoaded', function(){
        var saved = getCookie('site_theme');
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        var mode = saved || (prefersDark ? 'dark' : 'light');
        applyTheme(mode);

        var chk = document.getElementById('flexSwitchCheckDefault');
        if (chk) {
            chk.addEventListener('change', function(){
                var next = chk.checked ? 'dark' : 'light';
                setAndApply(next);
            });
        }
    });
})();
