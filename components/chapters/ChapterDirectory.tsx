/*
 * ChapterDirectory — the semantic baseline for the Chapters page.
 *
 * It is what the route renders before the interactive stage takes over (and the
 * only rendering with JavaScript unavailable), so the full State › Chapter
 * register is always present in the HTML: nothing about the network depends on
 * the map. Native <details>/<summary>, no client JS, keyboard-operable as-is.
 *
 * Counts are derived from the records. A state with no supplied chapters shows
 * its designed empty state rather than a fabricated list.
 */
import type { Chapters } from "@/content/types";

/** Awaiting verified content — a deliberate, designed state. */
const NEEDS_CONTENT = "[NEEDS CONTENT]";

export function ChapterDirectory({ data }: { data: Chapters }) {
  return (
    <div className="cm-fallback">
      <h2 className="type-label">South South network</h2>

      {data.states.length === 0 ? (
        <p className="cm-mark type-display-m">{NEEDS_CONTENT}</p>
      ) : (
        <ul className="cm-fallback__list">
          {data.states.map((state) => {
            const count = state.chapters.length;
            return (
              <li className="cm-fallback__state" key={state.slug}>
                <details>
                  <summary className="cm-fallback__toggle">
                    <span className="type-display-m">{state.state}</span>
                    <span className="cm-fallback__count type-label-s tnum">
                      {count} {count === 1 ? "chapter" : "chapters"}
                    </span>
                  </summary>
                  {count > 0 ? (
                    <ul className="cm-fallback__chapters">
                      {state.chapters.map((chapter) => (
                        <li className="cm-fallback__chapter type-body-l" key={chapter.slug}>
                          {chapter.institution}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="cm-mark type-body-l">{NEEDS_CONTENT}</p>
                  )}
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
