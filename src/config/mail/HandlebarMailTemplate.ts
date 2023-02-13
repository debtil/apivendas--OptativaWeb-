import handlebar from 'handlebars';
import fs from 'fs';

interface ITemplateVariable{
    [key: string]: string | number;
}

interface IParseMailtemplate{
    file: string;
    variables: ITemplateVariable
}

export default class HandleBarMailTemplate {
    public async parse({file, variables}: IParseMailtemplate): Promise<string>{
        const templateFileContent = await fs.promises.readFile(file, {encoding: 'utf8'});
        const parseTemplate = handlebar.compile(templateFileContent);
        return parseTemplate(variables);
    }
}