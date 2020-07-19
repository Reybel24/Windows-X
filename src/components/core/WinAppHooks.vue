<script>
// Import windows apps and make them available to system
import Email from '@/components/apps/AppEmail.vue';
import Spotify from '@/components/apps/AppSpotify.vue';
import FileExplorer from '@/components/apps/AppFileExplorer.vue';
import Terminal from '@/components/apps/AppTerminal.vue';
import Notepad from '@/components/apps/AppNotepad.vue';

export default {
  components: {
    Email,
    Spotify,
    Terminal,
    FileExplorer,
    Notepad
  }
};
</script>