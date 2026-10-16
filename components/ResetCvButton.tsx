"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ResetIcon } from "@/components/ui/icons";

export function ResetCvButton({ onReset }: { onReset: () => void }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <Button onClick={() => setConfirming(true)} aria-label="Reset CV">
        <ResetIcon />
        <span className="hidden sm:inline">Reset CV</span>
      </Button>

      <ConfirmDialog
        open={confirming}
        title="Reset CV?"
        description="This permanently deletes everything you have entered, including the copy saved in this browser. This can't be undone."
        confirmLabel="Reset CV"
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          onReset();
        }}
      />
    </>
  );
}
