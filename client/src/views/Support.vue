<template>
  <div class="support-page">
    <div class="button-container" v-if="!currentPage">
      <button @click="showPage(1)">
        Support - Åbningstider og Kontaktinfomationer
      </button>
      <button @click="showPage(2)">
        Vejledninger til Videosamtale i ditSygehus
      </button>
      <button @click="showPage(3)">Meddelser</button>
      <button @click="showPage(4)">Mine Aftaler</button>
    </div>

    <div class="page-content">
      <!-- Content for the selected page -->
      <div v-if="currentPage">
        <h1>{{ currentPage.label }}</h1>
        <p class="page-text" v-if="currentPage.id === 1">
          <!-- Content for page 1 -->
          For dig, der har behov for support til Mit Sygehus. Der er mulighed
          for at få support alle hverdage - enten via din afdeling, eller ved at
          kontakte vores IT-support. Kontaktmuligheder inden kl. 14: For
          patienter og pårørende på Odense Universitetshospital (herunder
          Svendborg Sygehus og Nyborg Sygehus): Hvis du oplever problemer i
          forhold til Mit Sygehus, er du velkommen til at kontakte Mit
          Sygehus-forvaltningen på Odense Universitetshospital på telefon 65 41
          50 50 (hverdage mellem 8-14). For patienten og pårørende på Vejle,
          Kolding og Middelfart Sygehuse: Skulle du få problemer med at benytte
          videosamtaler, er du velkommen til at ringe til IT-support på tlf. 61
          62 25 15 (hverdage mellem 9-14) For patienter og pårørende på Sygehus
          Sønderjylland: Hvis du oplever problemer i forhold til videosamtaler i
          Mit Sygehus, er du velkommen til at kontakte den afdeling, der har
          indkaldt dig til videosamtale - se telefonnummer i indkaldelsesbrevet
          For patienter og pårørende på Esbjerg og Grindsted Sygehuse: Hvis du
          oplever problemer i forhold til videosamtaler i Mit Sygehus, er du
          velkommen til at kontakte den afdeling, der har indkaldt dig til
          videosamtale - se telefonnummer i indkaldelsesbrevet For patienter og
          pårørende i Psykiatrien i Region Syddanmark: Hvis du oplever problemer
          i forhold til videosamtaler i Mit Sygehus, er du velkommen til at
          kontakte Mit Sygehus supporttelefon på 24 25 68 58 (hverdage mellem
          9-14). Kontaktmuligheder efter kl. 14: Hvis du har behov for support
          uden sygehusenes normale åbningstid kan du kontakte den regionale
          borgersupport i IT-afdelingen på telefon 76 63 12 00. Der er åbent for
          henvendelse mandag-torsdag fra kl. 14.00-18.00. Fredag er der lukket.
        </p>
        <p class="page-text" v-else-if="currentPage.id === 2">
          <!-- Content for page 2 -->
          Praktisk information Inden du skal deltage i en videosamtale er det
          vigtigt, at du har læst vejledningen for afholdelse af videosamtale.
          Nedenfor finder du forskellige vejledninger, alt efter om du bruger
          computer, tablet eller mobiltelefon. Vælg den vejledning, som er
          relevant for dig. Desuden har vi samlet nogle gode råd til
          videosamtalen, som vi anbefaler at du følger. Inden du skal have
          videosamtale for første gang, anbefaler vi, at du kontakter vores
          IT-afdeling for et prøveopkald, både så du ved hvordan det fungerer,
          men også så vi er sikre på, at din pc/mobiltelefon eller tablet kan
          bruges til videosamtaler. Ring på 7663 1200 mandag - torsdag ml. kl.
          14.00-18.00 Vejledning til dig, der bruger computer Vejledning til
          dig, der bruger Android Vejledning til dig, der bruger iPhone/iPad
          Gode råd til videosamtaler For at opnå den bedste kvalitet af
          videosamtalen mellem dig og den sundhedsprofessionelle har vi nogle
          gode råd til dig. Anvender du en tablet eller mobiltelefon, kan det
          være en god ide at sætte den i en holder eller lignende, så den holdes
          stille At du er i et rum, hvor der er en god belysning (gerne dagslys)
          med ansigtet mod lyset At du befinder dig i rolige omgivelser, hvor du
          kan tale fortroligt og uforstyrret. Pårørende og videosamtaler Ved
          nogle samtaler vil der være mulighed for, at din pårørende kan deltage
          i samtalen, selv om du og din pårørende ikke opholder jer samme sted.
          Læs vejledningen om, hvordan du inviterer din pårørende med til en
          videosamtale. Pårørende og videosamtale Obs. vedr. børn op til 15 år:
          de personer, der har forældremyndigheden over en patient under 15 år,
          er automatisk tilknyttet som pårørende i Mit Sygehus. Som forældre
          skal du logge på Mit Sygehus med dit eget NemID for at få adgang til
          dit barns forløb, så du kan deltage i videosamtalen. Ofte stillede
          spørgsmål I forbindelse med din videosamtale kan du måske have et af
          nedenstående spørgsmål: Har du spørgsmål om hvordan du teknisk eller
          praktisk gennemfører en videosamtale? Ring til vores IT-afdeling på
          telefon 7663 1200 mandag - torsdag ml. kl. 14.00-18.00 for at
          gennemføre et test-samtale. Bliver du forhindret i at deltage på i
          videosamtalen? Ring til din afdeling og aftal et nyt tidspunkt Bliver
          videosamtalen afbrudt? Vent på at personalet ringer dig op, så I kan
          aftale nærmere Nogle afdelinger vil gerne have dig til at udfylde et
          spørgeskema om din oplevelse af videosamtalen. Har du haft en
          videosamtale på en af disse afdelinger, vil du få et spørgeskema i Mit
          Sygehus 1 time efter videosamtalen under menupunktet ”Spørgeskema ”.
          Vi takker for din hjælp. Venlig hilsen Personalet i IT-afdelingen
        </p>
        <p class="page-text" v-else-if="currentPage.id === 3">
          <!-- Content for page 3 -->
          <!-- ... (Your content here) ... -->
        </p>
        <p class="page-text" v-else-if="currentPage.id === 4">
          <!-- Content for page 4 -->
          <!-- ... (Your content here) ... -->
        </p>
        <button @click="goBack" class="btn">Go Back</button>
      </div>
    </div>
  </div>
</template>





<!-- <template>
  <div>
    <div class="button-container" v-if="!currentPage">
      <button @click="showPage(1)">
        Support - Åbningstider og Kontaktinfomationer
      </button>
      <button @click="showPage(2)">
        Vejledninger til Videosamtale i ditSygehus
      </button>
      <button @click="showPage(3)">Meddelser</button>
      <button @click="showPage(4)">Mine Aftaler</button>
    </div>

    <div class="page-content">
      <div v-if="currentPage">
        <h1>{{ currentPage.label }}</h1>
        <p v-if="currentPage.id === 1">
          For dig, der har behov for support til Mit Sygehus. Der er mulighed
          for at få support alle hverdage - enten via din afdeling, eller ved at
          kontakte vores IT-support. Kontaktmuligheder inden kl. 14: For
          patienter og pårørende på Odense Universitetshospital (herunder
          Svendborg Sygehus og Nyborg Sygehus): Hvis du oplever problemer i
          forhold til Mit Sygehus, er du velkommen til at kontakte Mit
          Sygehus-forvaltningen på Odense Universitetshospital på telefon 65 41
          50 50 (hverdage mellem 8-14). For patienten og pårørende på Vejle,
          Kolding og Middelfart Sygehuse: Skulle du få problemer med at benytte
          videosamtaler, er du velkommen til at ringe til IT-support på tlf. 61
          62 25 15 (hverdage mellem 9-14) For patienter og pårørende på Sygehus
          Sønderjylland: Hvis du oplever problemer i forhold til videosamtaler i
          Mit Sygehus, er du velkommen til at kontakte den afdeling, der har
          indkaldt dig til videosamtale - se telefonnummer i indkaldelsesbrevet
          For patienter og pårørende på Esbjerg og Grindsted Sygehuse: Hvis du
          oplever problemer i forhold til videosamtaler i Mit Sygehus, er du
          velkommen til at kontakte den afdeling, der har indkaldt dig til
          videosamtale - se telefonnummer i indkaldelsesbrevet For patienter og
          pårørende i Psykiatrien i Region Syddanmark: Hvis du oplever problemer
          i forhold til videosamtaler i Mit Sygehus, er du velkommen til at
          kontakte Mit Sygehus supporttelefon på 24 25 68 58 (hverdage mellem
          9-14). Kontaktmuligheder efter kl. 14: Hvis du har behov for support
          uden sygehusenes normale åbningstid kan du kontakte den regionale
          borgersupport i IT-afdelingen på telefon 76 63 12 00. Der er åbent for
          henvendelse mandag-torsdag fra kl. 14.00-18.00. Fredag er der lukket.
        </p>
        <p v-else-if="currentPage.id === 2">
          Praktisk information Inden du skal deltage i en videosamtale er det
          vigtigt, at du har læst vejledningen for afholdelse af videosamtale.
          Nedenfor finder du forskellige vejledninger, alt efter om du bruger
          computer, tablet eller mobiltelefon. Vælg den vejledning, som er
          relevant for dig. Desuden har vi samlet nogle gode råd til
          videosamtalen, som vi anbefaler at du følger. Inden du skal have
          videosamtale for første gang, anbefaler vi, at du kontakter vores
          IT-afdeling for et prøveopkald, både så du ved hvordan det fungerer,
          men også så vi er sikre på, at din pc/mobiltelefon eller tablet kan
          bruges til videosamtaler. Ring på 7663 1200 mandag - torsdag ml. kl.
          14.00-18.00 Vejledning til dig, der bruger computer Vejledning til
          dig, der bruger Android Vejledning til dig, der bruger iPhone/iPad
          Gode råd til videosamtaler For at opnå den bedste kvalitet af
          videosamtalen mellem dig og den sundhedsprofessionelle har vi nogle
          gode råd til dig. Anvender du en tablet eller mobiltelefon, kan det
          være en god ide at sætte den i en holder eller lignende, så den holdes
          stille At du er i et rum, hvor der er en god belysning (gerne dagslys)
          med ansigtet mod lyset At du befinder dig i rolige omgivelser, hvor du
          kan tale fortroligt og uforstyrret. Pårørende og videosamtaler Ved
          nogle samtaler vil der være mulighed for, at din pårørende kan deltage
          i samtalen, selv om du og din pårørende ikke opholder jer samme sted.
          Læs vejledningen om, hvordan du inviterer din pårørende med til en
          videosamtale. Pårørende og videosamtale Obs. vedr. børn op til 15 år:
          de personer, der har forældremyndigheden over en patient under 15 år,
          er automatisk tilknyttet som pårørende i Mit Sygehus. Som forældre
          skal du logge på Mit Sygehus med dit eget NemID for at få adgang til
          dit barns forløb, så du kan deltage i videosamtalen. Ofte stillede
          spørgsmål I forbindelse med din videosamtale kan du måske have et af
          nedenstående spørgsmål: Har du spørgsmål om hvordan du teknisk eller
          praktisk gennemfører en videosamtale? Ring til vores IT-afdeling på
          telefon 7663 1200 mandag - torsdag ml. kl. 14.00-18.00 for at
          gennemføre et test-samtale. Bliver du forhindret i at deltage på i
          videosamtalen? Ring til din afdeling og aftal et nyt tidspunkt Bliver
          videosamtalen afbrudt? Vent på at personalet ringer dig op, så I kan
          aftale nærmere Nogle afdelinger vil gerne have dig til at udfylde et
          spørgeskema om din oplevelse af videosamtalen. Har du haft en
          videosamtale på en af disse afdelinger, vil du få et spørgeskema i Mit
          Sygehus 1 time efter videosamtalen under menupunktet ”Spørgeskema ”.
          Vi takker for din hjælp. Venlig hilsen Personalet i IT-afdelingen
        </p>
        <p v-else-if="currentPage.id === 3">This is Page 3 content.</p>
        <p v-else-if="currentPage.id === 4">This is Page 4 content.</p>
        <button @click="goBack">Go Back</button>
      </div>
    </div>
  </div>
</template> -->

<script>
export default {
  data() {
    return {
      pages: [
        { id: 1, label: "Support - Åbningstider og Kontaktinfomationer" },
        { id: 2, label: "Vejledninger til Videosamtale i ditSygehus" },
        { id: 3, label: "Meddelser" },
        { id: 4, label: "Mine Aftaler" },
      ],
      currentPage: null, // Initialize without a default page
    };
  },
  methods: {
    showPage(pageId) {
      this.currentPage = this.pages.find((page) => page.id === pageId);
    },
    goBack() {
      this.currentPage = null; // Clear the current page to go back to the buttons
    },
  },
};
</script>

<style scoped>
.support-page {
  padding: 20px;
  text-align: center;
}

.button-container {
  margin-bottom: 20px;
}

.button-container button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.button-container button:hover {
  background-color: #2980b9;
}

.page-content {
  text-align: left;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.page-text {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}
</style>
