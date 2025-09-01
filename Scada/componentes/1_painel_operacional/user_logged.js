/* @license MIT */

var preffix = "Usuário:";
var suffix = "";
var font_size = 16; // número (px)

// DON'T CHANGE THE CODE BELOW

function getUsername() {
    var user = new com.serotonin.mango.Common().getUser();
    var username = String(user.getUsername());
    return username;
}

var fs = Number(font_size) || 12;
var avatarSize = Math.max( (fs * 2), 24 ); // tamanho do avatar (px)
var smallFs = Math.max(fs - 2, 10);

var username = getUsername() || "";
var trimmed = username.trim();
var nameParts = trimmed.split(/\s+/);
var initials = "";
if (nameParts.length === 1) {
    initials = (nameParts[0].charAt(0) || "").toUpperCase();
} else {
    initials = ((nameParts[0].charAt(0) || "") + (nameParts[1].charAt(0) || "")).toUpperCase();
}

var isAdmin = (trimmed.toLowerCase().indexOf("adm.") === 0);

var s = "";

s += "<div style=\"display:inline-flex; align-items:center; gap:14px; padding:6px 10px; border-radius:8px; background:#f6f7fb; box-shadow:0 1px 0 rgba(0,0,0,0.06); font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;\">";

// Avatar area: circle for normal users, shield for admin (black)
if (isAdmin) {
    s += "<div style=\"flex: 0 0 " + avatarSize + "px; width:" + avatarSize + "px; height:" + avatarSize + "px; display:inline-flex; align-items:center; justify-content:center;\">";
    s += "  <svg width=\"" + avatarSize + "px\" height=\"" + avatarSize + "px\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"admin shield\">";
    s += "    <path d=\"M50 4 L18 18 L18 47 C18 71 36 88 50 94 C64 88 82 71 82 47 L82 18 Z\" fill=\"#000000\"/>";
    //aumenta o tamanha da fonte dentro do shield
    s += "    <text x=\"50\" y=\"62\" text-anchor=\"middle\" fill=\"#ffffff\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"" + Math.round(fs * 1.9) + "\" font-weight=\"700\" dominant-baseline=\"middle\">" + initials + "</text>";
    s += "  </svg>";
    s += "</div>";
} else {
    s += "<div style=\"flex: 0 0 " + avatarSize + "px; width:" + avatarSize + "px; height:" + avatarSize + "px; border-radius:50%; background:#13af00; color:#ffffff; display:inline-flex; align-items:center; justify-content:center; font-weight:700; font-size:" + fs + "px;\">";
    s += initials;
    s += "</div>";
}

s += "<div style=\"display:flex; flex-direction:column; min-width:0;\">";

s += "  <span style=\"font-size:" + smallFs + "px; color:#6b7280; line-height:1;\">"+ (preffix ? preffix : "") + "</span>";
s += "  <span title=\"" + username.replace(/\"/g, '&quot;') + "\" style=\"font-size:" + fs + "px; color:#111827; font-weight:600; line-height:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:220px;\">"
s +=       username;
s += "  </span>";
if (suffix && suffix.length) {
    s += "  <span style=\"font-size:" + smallFs + "px; color:#6b7280; line-height:1;\">"+ suffix +"</span>";
}
s += "</div>";

s += "</div>";

return s;
