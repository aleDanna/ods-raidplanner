import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { renderToString } from 'react-dom/server';

export const renderWithPageBuilder = (req, res, pageFilename, content) => {
    res.render(pageFilename, {
        header: renderToString(Header()),
        content: renderToString(content),
        footer: renderToString(Footer())
    })
}