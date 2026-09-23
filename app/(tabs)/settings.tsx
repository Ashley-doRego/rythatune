import * as Application from "expo-application";
import ContentContainer from "@/components/ContentContainer";
import { SelectorButton } from "@/components/SelectorButton";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { useInvertColors } from "@/contexts/InvertColorsContext";
import { useKeepAwake } from "@/contexts/KeepAwakeContext";
import { useMetronomeHaptics } from "@/contexts/MetronomeHapticsContext";
import { useHaptic } from "@/contexts/HapticContext";
import { useNoteDisplay } from "@/contexts/NoteDisplayContext";
import { useReferencePitch } from "@/contexts/ReferencePitchContext";
import { n } from "@/utils/scaling";
import { StyleSheet } from "react-native";

export default function SettingsScreen() {
  const { hapticsEnabled, setHapticsEnabled, accentEnabled, setAccentEnabled } = useMetronomeHaptics();
  const { keepAwake, setKeepAwake } = useKeepAwake();
  const { invertColors, setInvertColors } = useInvertColors();
  const { referencePitch } = useReferencePitch();
  const { hapticEnabled, setHapticEnabled } = useHaptic();
  const { noteDisplay, setNoteDisplay } = useNoteDisplay();
  const version = Application.nativeApplicationVersion;

  return (
    <ContentContainer
      headerTitle={`Settings (v${version})`}
      hideBackButton
      style={styles.container}
    >
      <SelectorButton
        label="Reference Pitch"
        value={referencePitch === 440 ? "A440" : `Custom (A${referencePitch})`}
        href="/settings/calibration"
      />
      <ToggleSwitch
        label="Use Flats"
        value={noteDisplay === "flat"}
        onValueChange={(value) => setNoteDisplay(value ? "flat" : "sharp")}
      />
      <ToggleSwitch
        label="In-Tune Haptic"
        value={hapticEnabled}
        onValueChange={setHapticEnabled}
      />
      <ToggleSwitch
        label="Invert Colors"
        value={invertColors}
        onValueChange={setInvertColors}
      />
      <ToggleSwitch
        label="Metronome Haptic Feedback"
        value={hapticsEnabled}
        onValueChange={setHapticsEnabled}
      />
      <ToggleSwitch
        label="Downbeat Accent"
        value={accentEnabled}
        onValueChange={setAccentEnabled}
      />
      <ToggleSwitch
        label="Keep Screen Awake"
        value={keepAwake}
        onValueChange={setKeepAwake}
      />
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: n(20),
  },
});
