const request = require("request");
const fs = require("fs");

function getBuildTemplatesFilesList() {
    return new Promise((resolve, reject) => {

        const url = `https://api.github.com/repos/exorunltd/build-templates/git/trees/master?recursive=true`;

        request.get({
            headers: {
                'User-Agent': 'express'
            },
            url,
            timeout: 300000,
            json: true,
        }, function optionalCallback(err, httpResponse, body) {
            if (err || httpResponse.statusCode != 200) {
                reject(body);
            } else {
                resolve(body);
            }
        });

    })
}

async function templates() {
    const dumpDirContent = await getBuildTemplatesFilesList();

    const templates = dumpDirContent.tree.filter(elem => {
            return elem && elem.path && elem.path.indexOf('templates/') === 0 &&
                elem.path.includes('Dockerfile');
        })
        .map(e => {
            const path = e.path.replace('/Dockerfile', '');
            const name = e.path.replace('/Dockerfile', '').replace('templates/', '');

            return {
                path,
                name
            };
        });

    return templates;
}

function getTemplateFile(template, filename) {
    return new Promise((resolve, reject) => {

        const url = `https://raw.githubusercontent.com/exorunltd/build-templates/master/${template.path}/${filename}`;

        request.get({
            headers: {
                'User-Agent': 'express'
            },
            url,
            timeout: 300000,
        }, function optionalCallback(err, httpResponse, body) {
            if (err || httpResponse.statusCode != 200) {
                reject(body);
            } else {
                resolve(body);
            }
        });

    })
}
async function getTemplateByName(name) {
    const template = (await templates()).find(t => t.name === name);

    if (!template && name) {
        throw new Error(`Template ${name} not found`);
    }

    return template;
}
module.exports = async function (operation, options = {}) {
    try {
        switch (operation) {
            case "list-templates":
                return (await templates()).map(t => t.name);
                break;
            case "template":
                if (fs.existsSync("./Dockerfile")) {
                    throw new Error('A Dockerfile already exists. Make sure to remove it before applying a template.');
                }
                let template = await getTemplateByName(options.name);
                if (!template) {
                    if (options.name) {
                        throw new Error(`Invalid template name ${options.name}`)
                    }
                }
                let dockerfile = await getTemplateFile(template, "Dockerfile");
                fs.writeFileSync("./Dockerfile", dockerfile);
                return {
                    result: `Successfully applied template ${template.name} to ./Dockerfile.`
                }
                break;

        }

    } catch (err) {
        return err;
    }
};