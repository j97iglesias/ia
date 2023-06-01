import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export const getDataCity = async (ciudad, departamento, clima) => {
  const params = {
    model: "text-davinci-003",
    prompt: `
        lista los cultivos agricolas de la ciudad de ${ciudad} del departamento del ${departamento} en colombia, esta ciudad tiene un clima ${clima}
        `,
    max_tokens: 100,
    temperature: 0.4,
  };
  const response = await openai.createCompletion(params);
  let answer = response.data.choices[0].text.trim();
  answer = answer.replace(/^\d+\./gm, "");
  const cropsList = answer.split("\n").map((crop) => crop.trim());
  return cropsList;
};

export const semillaPh = async (cultivo, clima) => {
  const params = {
    model: "text-davinci-003",
    prompt: `
    ph apto y una descripcion para cultivar ${cultivo} en un ${clima}, con la siguiente estructura 
    {
      "ph": solo el o los numeros;
      "descripcion": no mas de 120 palabras
    }
    `,
    max_tokens: 250,
    temperature: 0.4,
  };
  const response = await openai.createCompletion(params);
  const answer = response.data.choices[0].text.trim();
  //answer = answer.replace(/^\d+\./gm, "");

  console.log(answer);
  return answer;
};
//promedio produc por hectareas
export const promMedida = async (cultivo, medida = 0) => {
  const params = {
    model: "text-davinci-003",
    prompt: `
   en una area de ${medida} metros cuadrados, cuantos arboles de ${cultivo} alcanzan, dado que en 3 metros cuadrados debe haber 1 arbol




    `,
    max_tokens: 2500,
    temperature: 0.4,
  };
  const response = await openai.createCompletion(params);
  const answer = response.data.choices[0].text.trim();
  //answer = answer.replace(/^\d+\./gm, "");

  console.log(answer);
  return answer;
};

promMedida('platano', 10000);