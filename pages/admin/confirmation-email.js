import JsonPreviewer from "components/JsonPreviewer";

export default function ConfirmationEmail({ emails }) {
  return (
    <>
      <div>EMAILS</div>
      <JsonPreviewer>{emails && emails}</JsonPreviewer>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const Imap = require("imap");
  const { simpleParser } = require("mailparser");
  const imapConfig = {
    user: process.env.EMAIL_SERVER_USER,
    password: process.env.EMAIL_SERVER_PASSWORD,
    host: process.env.EMAIL_SERVER_IN_HOST,
    port: Number(process.env.EMAIL_SERVER_IN_PORT),
    tls: true,
  };

  const getEmails = async () => {
    console.log(imapConfig);
    return new Promise((resolve, reject) => {
      try {
        const newEmails = [];
        const imap = new Imap(imapConfig);
        imap.once("ready", () => {
          imap.openBox("INBOX", false, () => {
            imap.search(["ALL", ["SINCE", new Date()]], (err, results) => {
              const f = imap.fetch(results, { bodies: "" });
              f.on("message", (msg) => {
                msg.on("body", (stream) => {
                  simpleParser(stream, async (err, parsed) => {
                    const { from, subject, textAsHtml, text } = await parsed;
                    console.log(`${from} - ${subject}`);
                    /* Make API call to save the data
                           Save the retrieved data into a database.
                           E.t.c
                        */
                    newEmails.push({ subject });
                  });
                });
                msg.once("attributes", (attrs) => {
                  const { uid } = attrs;
                  imap.addFlags(uid, ["\\Seen"], () => {
                    // Mark the email as read after reading it
                    console.log("Marked as read!");
                  });
                });
              });
              f.once("error", (ex) => {
                return Promise.reject(ex);
              });
              f.once("end", () => {
                console.log("Done fetching all messages!");

                imap.end();
              });
            });
          });
        });

        imap.once("error", (err) => {
          console.log(err);
          reject();
        });

        imap.once("end", () => {
          console.log("Connection ended");
          resolve(newEmails);
        });

        imap.connect();
      } catch (ex) {
        console.log("an error occurred");
        reject();
      }
    });
  };

  const emails = await getEmails();

  console.log("📧📧📧📧📧📧📧📧📧📧📧");
  console.log(emails);

  return {
    props: { emails },
  };
};
