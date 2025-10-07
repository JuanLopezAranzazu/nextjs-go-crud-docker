"use client";

import "@radix-ui/themes/styles.css";
import { Button, Theme } from "@radix-ui/themes";

export default function Home() {
  return (
    <Theme appearance="dark">
      <Button>
        Hola Mundo
      </Button>
    </Theme>
  );
}
