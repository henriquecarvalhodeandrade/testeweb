
const axios = require('axios');

async function buscarWednesday() {
  try {
    const response = await axios.get('https://api.tvmaze.com/search/shows?q=wednesday');

    // Filtra o resultado para achar a série com nome exatamente "Wednesday"
    const serie = response.data.find(item => item.show.name === "Wednesday");

    if (!serie) {
      console.log('Série "Wednesday" não encontrada.');
      return;
    }

    const s = serie.show;
    console.log('Série encontrada:');
    console.log(`Nome: ${s.name}`);
    console.log(`ID: ${s.id}`);
    console.log(`Gênero(s): ${s.genres.join(', ')}`);
    console.log(`Resumo: ${s.summary.replace(/<[^>]+>/g, '')}`);
    console.log(`Site oficial: ${s.officialSite}`);

    // Aqui você pode usar s.id para buscar episódios, se quiser
  } catch (error) {
    console.error('Erro:', error);
  }
}

buscarWednesday();