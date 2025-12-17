from typing import Dict, List, Optional, Any
from pydantic import BaseModel
from datetime import datetime, timedelta
import numpy as np
from .progress import ProgressTrackingService, ProgressUpdate
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LearningPath(BaseModel):
    user_id: str
    current_chapter: str
    current_lesson: Optional[str] = None
    recommended_next: str
    difficulty_level: str  # beginner, intermediate, advanced
    estimated_time: int  # in minutes
    confidence: float  # 0.0 to 1.0

class AdaptiveLearningService:
    def __init__(self, progress_service: ProgressTrackingService):
        self.progress_service = progress_service
        self.difficulty_thresholds = {
            "beginner": 0.0,
            "intermediate": 0.4,
            "advanced": 0.7
        }
        self.knowledge_weights = {
            "completion_rate": 0.4,
            "time_efficiency": 0.3,
            "score_performance": 0.3
        }

    def calculate_user_knowledge_level(self, user_id: str) -> Dict[str, float]:
        """
        Calculate the user's knowledge level based on their progress.

        Returns a dictionary with knowledge metrics:
        - comprehension: How well the user understands the material
        - retention: How well the user retains information
        - pace: How quickly the user progresses
        """
        user_progress = self.progress_service.get_user_progress(user_id)

        if not user_progress:
            return {
                "comprehension": 0.0,
                "retention": 0.0,
                "pace": 0.0,
                "difficulty_level": "beginner"
            }

        # Calculate comprehension based on scores
        scores = [p.score for p in user_progress if p.score is not None]
        comprehension = sum(scores) / len(scores) if scores else 0.5  # Default to 50%

        # Calculate retention based on progress consistency
        progress_values = [p.progress_percentage for p in user_progress]
        retention = np.std(progress_values) if progress_values else 0.0
        # Lower std deviation means more consistent progress (better retention)
        retention = max(0.0, 1.0 - retention / 100.0)  # Normalize to 0-1 scale

        # Calculate pace based on time spent vs progress
        total_time = sum(p.time_spent or 0 for p in user_progress)
        total_progress = sum(p.progress_percentage for p in user_progress)
        pace = (total_progress / max(1, total_time / 60)) if total_time > 0 else 0.5  # Progress per minute
        pace = min(1.0, pace / 2.0)  # Normalize assuming max 2% per minute is good

        # Determine difficulty level
        avg_performance = (comprehension + retention + pace) / 3
        if avg_performance >= 0.7:
            difficulty_level = "advanced"
        elif avg_performance >= 0.4:
            difficulty_level = "intermediate"
        else:
            difficulty_level = "beginner"

        return {
            "comprehension": min(1.0, comprehension / 100.0),  # Normalize to 0-1
            "retention": retention,
            "pace": pace,
            "difficulty_level": difficulty_level
        }

    def recommend_content(self, user_id: str, current_chapter: str = None) -> LearningPath:
        """
        Recommend the next piece of content based on user's learning patterns.
        """
        knowledge_level = self.calculate_user_knowledge_level(user_id)

        # Determine next content based on progress
        user_profile = self.progress_service.get_user_profile(user_id)
        completed_chapters = user_profile.get("completed_chapters", []) if user_profile else []

        # Simple chapter progression logic
        all_chapters = ["chapter1", "chapter2", "chapter3"]  # Adjust based on actual chapters
        next_chapter = None

        for chapter in all_chapters:
            if chapter not in completed_chapters:
                next_chapter = chapter
                break

        if not next_chapter:
            # User has completed all chapters, recommend review
            next_chapter = completed_chapters[-1] if completed_chapters else "chapter1"

        # Estimate time based on difficulty level
        base_time = 30  # minutes for beginner level
        difficulty_multiplier = {
            "beginner": 1.0,
            "intermediate": 0.8,
            "advanced": 0.6
        }

        estimated_time = int(base_time * difficulty_multiplier[knowledge_level["difficulty_level"]])

        # Calculate confidence in recommendation
        confidence = knowledge_level["comprehension"] * 0.4 + knowledge_level["retention"] * 0.3 + knowledge_level["pace"] * 0.3

        return LearningPath(
            user_id=user_id,
            current_chapter=current_chapter or "chapter1",
            recommended_next=next_chapter,
            difficulty_level=knowledge_level["difficulty_level"],
            estimated_time=estimated_time,
            confidence=min(1.0, confidence)
        )

    def adjust_difficulty(self, user_id: str, content_id: str, performance: float) -> str:
        """
        Adjust the difficulty level based on user performance.

        Args:
            user_id: The user's ID
            content_id: The content being evaluated
            performance: Performance score (0.0 to 1.0)

        Returns:
            The adjusted difficulty level
        """
        current_knowledge = self.calculate_user_knowledge_level(user_id)
        current_difficulty = current_knowledge["difficulty_level"]

        # Adjust difficulty based on performance
        if performance >= 0.8:
            # High performance, suggest increasing difficulty
            if current_difficulty == "beginner":
                return "intermediate"
            elif current_difficulty == "intermediate":
                return "advanced"
        elif performance <= 0.4:
            # Low performance, suggest decreasing difficulty
            if current_difficulty == "advanced":
                return "intermediate"
            elif current_difficulty == "intermediate":
                return "beginner"

        # Keep current difficulty if performance is moderate
        return current_difficulty

    def generate_personalized_plan(self, user_id: str) -> Dict[str, Any]:
        """
        Generate a personalized learning plan for the user.
        """
        knowledge_level = self.calculate_user_knowledge_level(user_id)
        current_path = self.recommend_content(user_id)

        # Create a learning plan
        plan = {
            "user_id": user_id,
            "knowledge_level": knowledge_level,
            "recommended_path": current_path,
            "study_schedule": self.create_schedule(user_id, current_path),
            "focus_areas": self.identify_focus_areas(user_id),
            "estimated_completion": self.estimate_completion_time(user_id, knowledge_level)
        }

        return plan

    def create_schedule(self, user_id: str, learning_path: LearningPath) -> List[Dict[str, Any]]:
        """
        Create a personalized study schedule.
        """
        # Simple schedule creation based on user's pace and availability
        schedule = []

        # For demonstration, create a simple 7-day schedule
        for i in range(7):
            day = {
                "day": i + 1,
                "content": learning_path.recommended_next,
                "duration_minutes": learning_path.estimated_time,
                "difficulty": learning_path.difficulty_level
            }
            schedule.append(day)

        return schedule

    def identify_focus_areas(self, user_id: str) -> List[Dict[str, str]]:
        """
        Identify areas where the user needs to focus more attention.
        """
        focus_areas = []

        # Get user progress
        user_progress = self.progress_service.get_user_progress(user_id)

        # Identify low-scoring areas
        low_scoring = [p for p in user_progress if p.score is not None and p.score < 70]

        for progress in low_scoring:
            focus_areas.append({
                "type": "review",
                "target": progress.chapter_id,
                "reason": f"Score was {progress.score}%, which is below proficiency threshold"
            })

        # Identify areas with slow progress
        slow_progress = [p for p in user_progress if p.time_spent and p.progress_percentage and
                        (p.progress_percentage / max(1, p.time_spent/60)) < 1.0]  # Less than 1% per minute

        for progress in slow_progress:
            focus_areas.append({
                "type": "practice",
                "target": progress.chapter_id,
                "reason": "Progress is slower than expected for this content"
            })

        return focus_areas

    def estimate_completion_time(self, user_id: str, knowledge_level: Dict[str, float]) -> str:
        """
        Estimate the time to complete the course based on user's learning patterns.
        """
        user_profile = self.progress_service.get_user_profile(user_id)
        if not user_profile:
            return "Cannot estimate - no user data"

        # Calculate based on pace and remaining content
        total_chapters = 3  # Adjust based on actual number of chapters
        completed_chapters = len(user_profile.get("completed_chapters", []))
        remaining_chapters = total_chapters - completed_chapters

        # Estimate based on user's pace
        avg_time_per_chapter = knowledge_level.get("pace", 0.5) * 60  # Convert to minutes per chapter
        estimated_remaining_time = remaining_chapters * avg_time_per_chapter

        # Convert to readable format
        if estimated_remaining_time < 60:
            return f"{int(estimated_remaining_time)} minutes"
        elif estimated_remaining_time < 1440:  # Less than a day
            return f"{int(estimated_remaining_time / 60)} hours"
        else:
            return f"{int(estimated_remaining_time / 1440)} days"

# Initialize the adaptive learning service with the progress service
# Handle circular import by importing inside the function
def _create_adaptive_learning_service():
    from .progress import progress_service
    return AdaptiveLearningService(progress_service)

adaptive_learning_service = _create_adaptive_learning_service()


# Example usage and testing
if __name__ == "__main__":
    print("Testing Adaptive Learning Service...")

    # Example: Save some progress for a user
    progress_update1 = ProgressUpdate(
        user_id="user123",
        chapter_id="chapter1",
        lesson_id="lesson1",
        progress_percentage=100.0,
        time_spent=1800,  # 30 minutes
        completed=True,
        score=85.0
    )

    progress_update2 = ProgressUpdate(
        user_id="user123",
        chapter_id="chapter1",
        lesson_id="lesson2",
        progress_percentage=75.0,
        time_spent=1200,  # 20 minutes
        completed=False,
        score=78.0
    )

    # Save progress
    progress_service.save_progress(progress_update1)
    progress_service.save_progress(progress_update2)

    # Calculate knowledge level
    knowledge = adaptive_learning_service.calculate_user_knowledge_level("user123")
    print(f"Knowledge level: {knowledge}")

    # Get learning path recommendation
    learning_path = adaptive_learning_service.recommend_content("user123")
    print(f"Learning path: {learning_path}")

    # Generate personalized plan
    plan = adaptive_learning_service.generate_personalized_plan("user123")
    print(f"Personalized plan: {plan}")