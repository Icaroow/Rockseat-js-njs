const {select, input, checkbox} = require ('@inquirer/prompts')

let meta = {
    value: "Ser feliz",
    checked: false,
}
let metas = [meta];

const cadastrarMeta = async () => {
    const meta = await input({
    message: 'Qual a sua meta?'
    }) 
        if (meta.length == 0) {
            console.log('Erro 280: não foi identificado uma meta');
            return;
        }

        metas.push({
            value: meta, checked: false
        })

    }

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as Setas, o Espaço para desmacar e Enter para finalizar",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) =>{
        m.checked = false;
    })


    if (respostas.length == 0) {
        console.log('Erro 280: não foi identificado uma meta');
        return;
    }

    

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })

        meta.checked = true;
    })

    console.log ('Meta(s) concluidas(s)');
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked;      
})
    if (realizadas.length == 0) {
        console.log('Nao existem metas ainda');
        return;
    }

    await select ({
        message: 'Metas realizadas',
        choices: [...realizadas]
    })
    console.log(realizadas);
        
    }



const start = async () => {
    while (true) {
        
        const options = await select ({
            message: 'Menu >',
            choices: [{
                name: 'Cadastrar metas',
                value: "cadastrar"
            },
            
            {
                name: 'Lita de metas',
                value: "lista"
            },
            
            {
                name: 'Metas realizadas',
                value: 'realizadas'
            },

            {
                name: 'Sair',
                value: "sair"
            }]

        });

    switch (options) {
        case "cadastrar":
            await cadastrarMeta();
                console.log(metas)
        break;

        case 'lista':
            await listarMetas();
            console.log(metas)
        break;
        
        case 'realizadas':            
        await metasRealizadas();
        break;


            case 'sair':
                console.log('Até mais!')
                return;
        }
    }

}
start();


