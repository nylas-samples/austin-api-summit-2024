import { Header } from "./ui/header";
import { Footer } from "./ui/footer";
import { EmailEntry } from "./email-entry";

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden border-t border-gray-200 dark:border-gray-800">
      <Header />
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="grid gap-2 p-6">
          <EmailEntry />
        </div>
      </div>
      <Footer />
    </div>
  );
}
