import React from "react";

import * as styles from "./Meta.module.scss";

interface Props {
  date: string;
}

const Meta: React.FC<Props> = ({ date }: Props) => (
  <div className={styles.meta}>
    <p className={styles.date}>
      Published{" "}
      {new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}
    </p>
  </div>
);

export default Meta;
