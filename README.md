<p align="center">
  <h3 align="center">🎉 Discord Sunucu Patlatma Sistemi 🎉</h3>
</p>

## 🎉 Bilgilendirme;

- Destek Almak İçin [darkdaysdev](https://discord.com/users/901094423033708576) & [kayarouxel](https://discord.com/users/1183921141543358494) Dm Yazabilirsiniz!

## ⚡Kurulum;

```js
module.exports = {
token: [
"",
"",
""
], /// Self Bot tokenleri sunucunun boyutuna göre arttırılabilir (minimum 2 tane self token girmeniz önerilir hızlı işlem yapması için)
prefix: ["."], /// prefix
owner: [""], /// Komutları çalıştıracak kullanıcı ID'leri
guildID: "", /// Sunucu ID
Bot: {
RoleName: "", /// Rol adı
ChannelName: "", /// Kanal adı
GuildName: "", /// Sunucu adı
GuildIcon: "", /// Sunucu ikonu
Message: "", /// Spamlanacak mesaj 
RoleDelete: true,
RoleCreate: true,
ChannelDelete: true,
ChannelCreate: true,
GuildUpdate: true,
EveryoneAdministrator: true,
Spam: true,
WebhookDelete: true,
}
}
```
