/**
 * DubPilot — Master Application Orchestrator
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Bedrock Service
  const bedrockService = new window.BedrockService();

  // 2. Initialize Video Player Controller
  const playerController = new window.VideoPlayerController({
    videoElementId: 'mainVideo'
  });

  // 3. Initialize Alexa+ Agent
  const alexaAgent = new window.AlexaAgent(playerController, bedrockService);

  // 4. Bind Manual Language Switching Chips
  document.querySelectorAll('.lang-chip').forEach(chip => {
    chip.addEventListener('click', async (e) => {
      const targetLang = e.target.dataset.lang;
      await playerController.switchLanguage(targetLang);

      // Trigger Alexa confirmation
      const langNames = { en: 'English', es: 'Spanish', hi: 'Hindi', fr: 'French' };
      alexaAgent.appendMessage('alexa', `Audio switched to ${langNames[targetLang] || targetLang}.`);
      alexaAgent.speakVoice(`Switched to ${langNames[targetLang] || targetLang}.`);
    });
  });

  // 5. Settings Modal Controls
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  const toggleProxyCheckbox = document.getElementById('toggleProxy');

  if (settingsBtn && settingsModal) {
    settingsBtn.addEventListener('click', () => {
      settingsModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
      settingsModal.classList.remove('active');
    });

    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.remove('active');
      }
    });

    if (saveSettingsBtn && toggleProxyCheckbox) {
      saveSettingsBtn.addEventListener('click', () => {
        bedrockService.useProxy = toggleProxyCheckbox.checked;
        const statusBadge = document.getElementById('bedrockModeBadge');
        if (statusBadge) {
          statusBadge.textContent = bedrockService.useProxy ? 'AWS Bedrock Live' : 'Bedrock Simulated';
        }
        settingsModal.classList.remove('active');
        alexaAgent.appendMessage('alexa', `Settings saved. Bedrock mode: ${bedrockService.useProxy ? 'Live AWS Proxy' : 'Offline Simulation'}.`);
      });
    }
  }

  console.log('DubPilot Alexa+ Multimodal Studio Initialized Successfully.');
});
