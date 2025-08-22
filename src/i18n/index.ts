import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nBackend from "i18next-http-backend";
i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          title: "Multi-language app",
          label: "Select another language!",
          about: "About",
          home: "Home Page AAAAAAAAAAAAA",
          create_role:"Add Role",
          update_role: "Update Permission",
          create_new: "Add New",
          update:"Update"
        },
      },
      vi: {
        translation: {
          title: "Đa ngôn ngữ",
          label: "Chọn một ngôn ngữ khác!",
          about: "About",
          home: "Trang chủ",
          create_role:"Thêm mới Vai trò",
          update_role: "Cập nhật permission",
          create_new: "Thêm mới",
          update:"Cập nhật"
        },
      },
      es: {
        translation: {
          title: "Aplicación en varios idiomas",
          label: "Selecciona otro lenguaje!",
          about: "Sobre mí",
          home: "Inicio",
        },
      },
      it: {
        translation: {
          title: "Applicazione multilingue",
          label: "Selezionare un'altra lingua ",
          about: "Su di me",
          home: "Casa",
        },
      },
    },
  });

export default i18n;