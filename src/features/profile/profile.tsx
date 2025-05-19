import UserDetails from "../user/user-detail/user-detail";
import { useAuth } from "../../core/contexts/auth.context";

const Profile = () => {
  const { currentUser } = useAuth();

  // return <>Profile</>;
  return <UserDetails id={currentUser?.id ?? undefined} />;
};

export default Profile;
