import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <p>Landing here!</p>

      <Card>
        <h2>Design system primitives</h2>
        <p>
          Button, Card, and Badge — rendered here as a rendering smoke test for
          Stage 2.
        </p>
        <div className={styles.row}>
          <Badge variant="success">Success</Badge>
          <Button variant="primary">Primary</Button>
        </div>
      </Card>
    </main>
  );
}
