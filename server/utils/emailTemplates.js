// utils/emailTemplates.js

const baseTemplate = (title, message, buttonText = "Contact Support", buttonLink = "#") => {
  return `
  <body style="margin:0; padding:0; background:#f5f7fb; font-family: 'Segoe UI', Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          
          <!-- Main Container -->
          <table width="600" cellpadding="0" cellspacing="0" style="
            background:#ffffff;
            border-radius:12px;
            box-shadow:0 4px 20px rgba(0,0,0,0.05);
            overflow:hidden;
          ">

            <!-- Header -->
            <tr>
              <td style="
                background:#111827;
                padding:20px 30px;
                color:#ffffff;
                font-size:18px;
                font-weight:600;
                letter-spacing:0.5px;
              ">
                LevelUp Platform
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 30px;">
                
                <!-- Title -->
                <h1 style="
                  margin:0 0 15px;
                  font-size:26px;
                  color:#111827;
                  font-weight:700;
                ">
                  ${title}
                </h1>

                <!-- Divider -->
                <div style="
                  width:50px;
                  height:3px;
                  background:#111827;
                  margin-bottom:20px;
                  border-radius:2px;
                "></div>

                <!-- Message -->
                <p style="
                  font-size:15px;
                  color:#4b5563;
                  line-height:1.7;
                  margin:0 0 30px;
                ">
                  ${message}
                </p>

                <!-- Button -->
                <a href="${buttonLink}" style="
                  display:inline-block;
                  padding:14px 28px;
                  background:#111827;
                  color:#ffffff;
                  text-decoration:none;
                  border-radius:30px;
                  font-size:14px;
                  font-weight:600;
                  letter-spacing:0.8px;
                ">
                  ${buttonText.toUpperCase()}
                </a>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="
                padding:25px 30px;
                background:#f9fafb;
                font-size:12px;
                color:#6b7280;
                text-align:left;
              ">
                <strong>LevelUp Platform</strong><br/>
                Building better learning experiences.<br/><br/>

                If you need assistance, please contact our support team.<br/><br/>

                © ${new Date().getFullYear()} LevelUp. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  `;
};


// Templates

exports.courseCreatedTemplate = (courseTitle) =>
  baseTemplate(
    "Course Created Successfully",
    `Your course <strong>${courseTitle}</strong> has been successfully created and is now live on the platform.`,
    "View Course"
  );

exports.enrollmentTemplate = (courseTitle) =>
  baseTemplate(
    "Enrollment Confirmed",
    `You are now enrolled in <strong>${courseTitle}</strong>. Start learning and track your progress anytime.`,
    "Start Learning"
  );

exports.quizResultTemplate = (score, total) =>
  baseTemplate(
    "Quiz Result",
    `You scored <strong>${score} / ${total}</strong>. Review your answers and keep improving your performance.`,
    "View Details"
  );