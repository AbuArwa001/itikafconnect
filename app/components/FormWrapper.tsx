import { Box, Card, Flex, Inset, Text } from "@radix-ui/themes";
import Image from "next/image";
import log from "@/app/assets/images/msq1.jpg";
interface FormWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const FormWrapper = ({ title, subtitle, children }: FormWrapperProps) => {
  return (
    <Flex justify="center" align="center" className="h-screen">
      <Card
        size="3"
        variant="surface"
        className="w-full max-w-md bg-light_gold"
      >
        {/* Image Header */}
        <Inset clip="padding-box" side="top">
          <Image
            src={log}
            alt="Mosque Image"
            className="object-cover w-full h-40 bg-gray-500"
            width={0}
            height={0}
            priority={true}
          />
        </Inset>

        {/* Content Section */}
        <Box className="p-6 space-y-3">
          <Text size="4" weight="bold" mb="2">
            {title}
          </Text>
          <Text as="p" size="2" mb="4">
            {subtitle}
          </Text>

          {children}
        </Box>
      </Card>
    </Flex>
  );
};

export default FormWrapper;
