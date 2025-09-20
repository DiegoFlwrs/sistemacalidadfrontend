import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata = {
  title: "Sistema de Nominas",
  description: "Panel de Administración de Nominas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
          <main>{children}</main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
      </body>
    </html>
  );
}
