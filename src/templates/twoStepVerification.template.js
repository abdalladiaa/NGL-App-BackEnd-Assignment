export const twoStepVerificationTemplate = (otp) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>2-Step Verification Code</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #f4f7fb;
            font-family: Arial, Helvetica, sans-serif;
        ">

            <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 15px;">
                <tr>
                    <td align="center">

                        <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            style="
                                max-width: 520px;
                                background-color: #ffffff;
                                border-radius: 16px;
                                overflow: hidden;
                                box-shadow: 0 8px 30px rgba(0,0,0,0.08);
                            "
                        >

                            <!-- Header -->
                            <tr>
                                <td style="
                                    background: linear-gradient(135deg, #0ea5e9, #6366f1);
                                    padding: 35px 30px;
                                    text-align: center;
                                ">
                                    <h1 style="
                                        margin: 0;
                                        color: #ffffff;
                                        font-size: 28px;
                                    ">
                                        NGL-App
                                    </h1>

                                    <p style="
                                        margin: 10px 0 0;
                                        color: #e0e7ff;
                                        font-size: 14px;
                                    ">
                                        Two-Step Verification
                                    </p>
                                </td>
                            </tr>

                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px 35px;">

                                    <h2 style="
                                        margin: 0 0 15px;
                                        color: #111827;
                                        font-size: 22px;
                                    ">
                                        Security Verification
                                    </h2>

                                    <p style="
                                        margin: 0 0 25px;
                                        color: #6b7280;
                                        font-size: 15px;
                                        line-height: 1.7;
                                    ">
                                        A sign-in or security action was attempted on your account. 
                                        Please use the two-step verification code below to confirm your identity.
                                    </p>

                                    <!-- OTP -->
                                    <div style="
                                        background-color: #f0fdfa;
                                        border: 1px solid #99f6e4;
                                        border-radius: 12px;
                                        padding: 20px;
                                        text-align: center;
                                        margin-bottom: 25px;
                                    ">
                                        <p style="
                                            margin: 0 0 8px;
                                            color: #0f766e;
                                            font-size: 13px;
                                            font-weight: 500;
                                        ">
                                            Your 2-Step verification code
                                        </p>

                                        <div style="
                                            color: #0d9488;
                                            font-size: 34px;
                                            font-weight: bold;
                                            letter-spacing: 8px;
                                        ">
                                            ${otp}
                                        </div>
                                    </div>

                                    <p style="
                                        margin: 0;
                                        color: #6b7280;
                                        font-size: 14px;
                                        line-height: 1.6;
                                        text-align: center;
                                    ">
                                        This code will expire in
                                        <strong style="color: #111827;">
                                            5 minutes
                                        </strong>.
                                    </p>

                                    <p style="
                                        margin: 25px 0 0;
                                        color: #ef4444;
                                        font-size: 12px;
                                        line-height: 1.6;
                                        text-align: center;
                                    ">
                                        Never share this code with anyone. If you did not attempt to sign in, someone may know your password; please secure your account immediately.
                                    </p>

                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="
                                    background-color: #f9fafb;
                                    padding: 20px;
                                    text-align: center;
                                ">
                                    <p style="
                                        margin: 0;
                                        color: #9ca3af;
                                        font-size: 12px;
                                    ">
                                        © 2026 NGL-App. All rights reserved.
                                    </p>
                                </td>
                            </tr>

                        </table>

                    </td>
                </tr>
            </table>

        </body>
        </html>
    `;
};

