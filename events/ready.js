module.exports = {
  name: "ready",
  once: true,
  execute(client, commands, rest, Routes) {
    console.log("DikDns Bot is ready.");

    const CLIENT_ID = client.user.id;

    (async () => {
      try {
        if (process.env.DEV === "production") {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
          });
          console.log("Succesfully registered commands globally.");
        } else {
          await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
            {
              body: commands,
            }
          );
          console.log("Succesfully registered commands locally.");
        }
      } catch (error) {
        if (error) console.log(error);
      }
    })();
  },
};
