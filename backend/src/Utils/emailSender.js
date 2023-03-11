import dotenv from 'dotenv';
import AWS from 'aws-sdk';
dotenv.config();

const SESSender = async (email, message, subject = 'User Sign up') => {
  let sesParams = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emailVerifyTemplateGenerator(message),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: process.env.AWS_SES_VERIFIED_EMAIL,
  };

  var sendPromise = new AWS.SES({
    apiVersion: '2010– 12– 01',
  })
    .sendEmail(sesParams)
    .promise();
  await sendPromise
    .then(function (data) {
      console.log('Email is sent');
    })
    .catch(function (err) {
      console.error(err, err.stack);
      return err;
    });
};

const emailVerifyTemplateGenerator = (message) => `<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Verify your email</title>
    <style type="text/css">
        .ExternalClass,
        .ExternalClass div,
        .ExternalClass font,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass td,
        
        
        #outlook a {
            padding: 0;
        }
        
        .ExternalClass,
        .ReadMsgBody {
            width: 100%;
        }
        
        a,
        blockquote,
        body,
        li,
        p,
        table,
        td {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        table,
        td {
            mso-table-lspace: 0;
            mso-table-rspace: 0;
        }
        
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            outline: 0;
            text-decoration: none;
        }
        
        table {
            border-collapse: collapse !important;
        }
        
        #bodyCell,
        #bodyTable,
        body {
            height: 100% !important;
            margin: 0;
            padding: 0;
            font-family: Helvetica, Arial, sans-serif=;
        }
        
        #bodyCell {
            padding: 20px;
        }
        
        #bodyTable {
            width: 560px;
        }
        
        @media only screen and (max-width: 480px) {
            #bodyTable,
            body {
                width: 100% !important;
            }
            a,
            blockquote,
            body,
            li,
            p,
            table,
            td {
                -webkit-text-size-adjust: none !important;
            }
            body {
                min-width: 100% !important;
            }
            #bodyTable {
                max-width: 560px !important;
            }
            #signIn {
                max-width: 280px !important;
            }
        }
    </style>
</head>
<body style="background-color: #ffffff;">
    <center>
        <table style="width: 560px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;font-family: Helvetica, Arial, sans-serif;border-collapse: collapse !important;height: 100% !important;background-color: #ffffff;"
            align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
            <tr>
                <td align="center" valign="top" id="bodyCell" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;font-family: Helvetica, Arial, sans-serif;height: 100% !important;">
                    <div class="top" style="background-color: #ffffff;color:#202123; padding: 27px 20px 0 15px;">
                    <div class="main" style="background-color: #ffffff;color:#353740; padding: 40px 20px;text-align: left; line-height:1.5;">
                        <h1 style="color:#202123;font-size: 32px; line-height: 40px; margin: 0 0 20px;">Verify your login</h1>
                        
                        <p style="margin: 24px 0 0; text-align: left;">
                            <p style="display:inline-block;text-decoration:none;background:#10A37F;border-radius:3px;color:white;font-family: Helvetica, sans-serif;font-size:16px;line-height: 24px;font-weight:400;padding:12px 20px 11px;margin:0px;" target="_blank">
                                ${message}
                            </p>
                        </p>
                    </div>
                    
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`;

export default SESSender;
