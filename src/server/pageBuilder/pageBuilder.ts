import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { renderToString } from 'react-dom/server';

export const renderWithPageBuilder = (content) => {
    return {
        header: renderToString(Header()),
        content: renderToString(content),
        footer: renderToString(Footer())
    }
}