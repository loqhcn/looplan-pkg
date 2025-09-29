import { ref } from 'vue';
import type { CSSProperties } from 'vue';
export interface FollowOptions {
    position: string;
    arrow?: boolean;
    arrowSize?: number;
    fps?: number;
}
export interface FollowProps {
    target: string | HTMLElement;
    options: FollowOptions;
}
interface UseFollowReturn {
    followTarget: ReturnType<typeof ref<HTMLElement | string | null>>;
    followOptions: ReturnType<typeof ref<FollowOptions | null>>;
    followAnimationFrame: ReturnType<typeof ref<number | null>>;
    arrowDirection: ReturnType<typeof ref<string | null>>;
    arrowSize: ReturnType<typeof ref<number>>;
    arrowStyle: CSSProperties;
    targetCenter: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    showArrow: ReturnType<typeof ref<Boolean>>;
    initFollow: (followProps: FollowProps | null, containerRef: HTMLElement, containerStyle: CSSProperties, onPositionCalculated?: () => void) => boolean;
    updateFollowPosition: (containerRef: HTMLElement, containerStyle: CSSProperties, onPositionCalculated?: () => void) => void;
    updateArrowStyle: () => void;
    cleanup: () => void;
}
declare function useFollow(): UseFollowReturn;
export default useFollow;
