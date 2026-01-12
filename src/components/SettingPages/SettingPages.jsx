
import { useSelector } from 'react-redux';

const useThemeColors = () => {
    const { settingPage } = useSelector((state) => state.settingPage);

    const primaryColor = settingPage?.mainColor || '#000000'; 
    const secondaryColor = settingPage?.secondaryColor || '#ffffff'; 
    const typography = settingPage?.typography || 'Roboto';

    return { primaryColor, secondaryColor, typography };
};

export default useThemeColors;
