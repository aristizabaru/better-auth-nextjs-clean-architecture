import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components";
import { SignUpForm } from "./_components/sign-up-form";

export default function Login() {
  return (
    <section className="grid h-svh place-content-center">
      <Tabs defaultValue="signin" className="mx-auto my-6 w-md px-4">
        <TabsList>
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            </CardHeader>
            <CardContent>Sign In Form</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <SignUpForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
