const { App } = require("@slack/bolt");
require("dotenv").config();

const gira = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

(async () => {
  await gira.start();
  console.log("GiraBot na área!");
})();

//-------------------------------------------------------------------------------
//------------------------------/criarsquad--------------------------------------
//-------------------------------------------------------------------------------

gira.command("/criarsquad", async ({ ack, event, body, client, logger }) => {
  await ack();

  try {
    canal = body.channel_id;
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "criarsquad",
        title: {
          type: "plain_text",
          text: "Criar novo Squad",
          emoji: true,
        },
        submit: {
          type: "plain_text",
          text: "Enviar",
          emoji: true,
        },
        close: {
          type: "plain_text",
          text: "Cancelar",
          emoji: true,
        },
        blocks: [
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "plain_text_input-action",
            },
            label: {
              type: "plain_text",
              text: "Nome",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              multiline: true,
              action_id: "plain_text_input-action",
            },
            label: {
              type: "plain_text",
              text: "Descrição",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "plain_text_input-action",
            },
            label: {
              type: "plain_text",
              text: "URL da imagem (gerar em https://imgur.com/upload)",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "Tipo de gráfico",
              emoji: true,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "static_select",
                placeholder: {
                  type: "plain_text",
                  text: "Selecione um tipo",
                  emoji: true,
                },
                options: [
                  {
                    text: {
                      type: "plain_text",
                      text: "Barras",
                      emoji: true,
                    },
                    value: "barra",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "Colunas",
                      emoji: true,
                    },
                    value: "coluna",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "Pizza",
                      emoji: true,
                    },
                    value: "pizza",
                  },
                ],
                action_id: "actionId-3",
              },
            ],
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "Tipo de área",
              emoji: true,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "static_select",
                placeholder: {
                  type: "plain_text",
                  text: "Selecione um tipo",
                  emoji: true,
                },
                options: [
                  {
                    text: {
                      type: "plain_text",
                      text: "Demanda",
                      emoji: true,
                    },
                    value: "barra",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "Projeto",
                      emoji: true,
                    },
                    value: "coluna",
                  },
                ],
                action_id: "actionId-3",
              },
            ],
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "plain_text_input-action",
            },
            label: {
              type: "plain_text",
              text: "URL do canal",
              emoji: true,
            },
          },
        ],
      },
    });
  } catch (error) {
    logger.error(error);
  }
});

gira.view("criarsquad", async ({ ack, view, body, client, event }) => {
  // get the email value from the input block with `email_address` as the block_id
  const forms = view.state.values;
  await ack({
    response_action: "clear",
  });
  const result = client.chat.postMessage({
    // channel: body["user"]["id"],
    channel: canal,
    text: "Formulário enviado com sucesso!!",
  });

  console.log(forms);
});

//-------------------------------------------------------------------------------
//------------------------------/demanda-----------------------------------------
//-------------------------------------------------------------------------------

gira.command("/demanda", async ({ ack, body, client, logger }) => {
  await ack();

  try {
    canal = body.channel_id;
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "demanda",
        title: {
          type: "plain_text",
          text: "Criar demanda",
          emoji: true,
        },
        submit: {
          type: "plain_text",
          text: "Enviar",
          emoji: true,
        },
        close: {
          type: "plain_text",
          text: "Cancelar",
          emoji: true,
        },
        blocks: [
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "plain_text_input-action",
            },
            label: {
              type: "plain_text",
              text: "Nome",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              multiline: true,
              action_id: "plain_text_input-action",
            },
            label: {
              type: "plain_text",
              text: "Descrição",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "datepicker",
              initial_date: "1990-04-28",
              placeholder: {
                type: "plain_text",
                text: "Select a date",
                emoji: true,
              },
              action_id: "datepicker-action",
            },
            label: {
              type: "plain_text",
              text: "Data",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "Importância",
              emoji: true,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "static_select",
                placeholder: {
                  type: "plain_text",
                  text: "Importância",
                  emoji: true,
                },
                options: [
                  {
                    text: {
                      type: "plain_text",
                      text: "Baixa",
                      emoji: true,
                    },
                    value: "barra",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "Média",
                      emoji: true,
                    },
                    value: "coluna",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "Alta",
                      emoji: true,
                    },
                    value: "coluna",
                  },
                ],
                action_id: "actionId-3",
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    logger.error(error);
  }
});

gira.view("demanda", async ({ ack, view, body, client, event }) => {
  // get the email value from the input block with `email_address` as the block_id
  const forms = view.state.values;
  await ack({
    response_action: "clear",
  });
  const result = client.chat.postMessage({
    // channel: body["user"]["id"],
    channel: canal,
    text: "Formulário enviado com sucesso!!",
  });

  console.log(forms);
});

//-------------------------------------------------------------------------------
//------------------------------/feito-------------------------------------------
//-------------------------------------------------------------------------------

gira.command("/feito", async ({ ack, body, client, logger }) => {
  await ack();

  try {
    if (!parseInt(body.text)) {
      result = client.chat.postMessage({
        channel: body.user_id,
        text: `Ao cadastrar a demanda realizada, deve-se inserir um número. ${body.text} não é um número`,
      });
    } else {
      result = client.chat.postMessage({
        channel: body.channel_id,
        text: `Demanda de ${
          (await client.users.profile.get({ user: body.user_id })).profile
            .first_name
        } cadastrada com sucesso!`,
      });
    }
    console.log();
  } catch (error) {
    logger.error(error);
  }
});

//-------------------------------------------------------------------------------
//------------------------------/backlog-------------------------------------------
//-------------------------------------------------------------------------------

gira.command("/backlog", async ({ ack, body, client, logger }) => {
  await ack();
  let demandas = [
    "Comprar arroz",
    "Comprar feijão",
    "Comprar leite",
    "Comprar café",
  ];

  let bulletlist = [];

  try {
    let count = 0;
    for (x of demandas) {
      bulletlist.push({
        text: {
          type: "plain_text",
          text: x,
          emoji: true,
        },
        value: count.toString(),
      });
      count++;
    }
    canal = body.channel_id;
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        callback_id: "backlog",
        title: {
          type: "plain_text",
          text: "Backlog",
          emoji: true,
        },
        submit: {
          type: "plain_text",
          text: "Enviar",
          emoji: true,
        },
        type: "modal",
        close: {
          type: "plain_text",
          text: "Cancelar",
          emoji: true,
        },
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Selecione abaixo as tarefas concluídas",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "checkboxes",
              options: bulletlist,
              action_id: "checkboxes-action",
            },
            label: {
              type: "plain_text",
              text: "Para adicionar tarefas, utilize o comando /demanda",
              emoji: true,
            },
          },
        ],
      },
    });
  } catch (error) {
    logger.error(error);
  }
});

gira.view("backlog", async ({ ack, view, body, client, event }) => {
  const forms = view.state.values;
  await ack({
    response_action: "clear",
  });
  const result = client.chat.postMessage({
    channel: canal,
    text: "Formulário enviado com sucesso!!",
  });

  console.log(forms);
});
