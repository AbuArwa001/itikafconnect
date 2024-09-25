"use client";
import { generatePdf } from "@/actions/send-profile-email";
import { User } from "@prisma/client";
import { Button, Card, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Attachments from "./Attachments";
import NextOfKeen from "./NextOfKeen";
import ProfiLeInfor from "./ProfiLeInfor";

// import { sendProfileEmail } from "@/utils/mails";

interface props {
  params: {
    id: string;
  };
}

// Helper function to convert HTML to PDF

// In your frontend component or utility file
// export const sendProfileEmail = async (
//   email: string,
//   subject: string,
//   htmlContent: string
// ) => {
//   try {
//     const response = await fetch("/api/sendEmail", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, subject, htmlContent }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to send email");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error in sendEmail:", error);
//     throw error;
//   }
// };

const Account = ({ params: { id } }: props) => {
  const componentRef = useRef(null);
  const [user, setUser] = useState<User | null>(null);
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    async function fetchUserData(id: string) {
      try {
        const res = await axios.get(`/api/users/${id}`);
        const fetchedUser = res.data as User;
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  // Function to handle printing or saving as PDF
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Function to send the profile via email
  const handleSendEmail = async () => {
    if (user?.email) {
      generatePdf("khalfanathman12@gmail.com", componentRef);
    } else {
      console.error("User email not found");
    }
    // try {
    //   await sendProfileEmail(
    //     "khalfanathman12@gmail.com",
    //     `User Profile Information for ${user?.email}`,
    //     `<p>Please find attached the profile information of user ${user?.name}.</p>`
    //   );
    //   alert("Email sent successfully!");
    // } catch (error) {
    //   console.error("Error sending email:", error);
    //   alert("Failed to send email.");
    // }
  };

  return (
    <div>
      <div ref={componentRef}>
        <Card className="p-4 bg-light_gold text-dark_brown">
          <Flex direction="column" align="center" gap="6">
            <div className="border-opacity-15 rounded-md border-2 w-[30%] text-center p-2 bg-white">
              <h1 className="font-bold text-lg">
                Profile Picture/Passport Size
              </h1>
            </div>

            <ProfiLeInfor user={user} />

            <NextOfKeen user={user} />

            <Attachments user={user} />
          </Flex>
        </Card>
      </div>

      {isAdmin && (
        <Flex className="justify-center mt-6">
          <Button
            color="orange"
            onClick={handlePrint}
            className="bg-light_gold text-white"
          >
            Print Profile
          </Button>
          <Button
            color="green"
            onClick={handleSendEmail}
            className="bg-light_gold text-white ml-4"
          >
            Send Profile via Email
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default Account;
