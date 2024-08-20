/**
 * Renders the profile page for the dashboard.
 *
 * The profile page includes a breadcrumb navigation and a form for creating a user profile.
 * The form is rendered using the `CreateProfileOne` component, which takes in categories and initial data as props.
 * The page is wrapped in a `ScrollArea` component to provide a scrollable content area.
 */
import BreadCrumb from '@/components/breadcrumb';
import { CreateProfileOne } from '@/components/forms/user-profile-stepper/create-profile';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Profile', link: '/dashboard/profile' }];
export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateProfileOne categories={[]} initialData={null} />
      </div>
    </ScrollArea>
  );
}
