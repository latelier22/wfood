

import useUserStore from '@/store/useUserStore';

const UserInfo = () => {
    const user = useUserStore((state) => state.user);

    if (!user) {
        return null;
    }

    return (
        <div>
            <p>Bienvenue, {user.username}!</p>
        </div>
    );
};

export default UserInfo;