import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { GET_LOGGED_IN_USER } from 'graphql/query/customer.query';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import SettingsContent from 'features/user-profile/settings/settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'features/user-profile/user-profile.style';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import { SEO } from 'components/seo';
import ErrorMessage from 'components/error-message/error-message';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const { data, error, loading } = useQuery(GET_LOGGED_IN_USER);

  if (!data || loading) {
    return <div>loading...</div>;
  }
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <SEO title="Profile - Mahdi Fashion" description="Profile Details" />
      <ProfileProvider initData={data.getUser}>
        <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
            <ContentBox>
              <SettingsContent deviceType={deviceType} />
            </ContentBox>
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default ProfilePage;
