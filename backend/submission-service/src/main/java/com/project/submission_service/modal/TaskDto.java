package com.project.submission_service.modal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {

    private long id;

    private String title;

    private String description;

    private String image;

    private Long assignedUserId;

    private List<String> tags = new ArrayList<>();

    private TaskStatus status;

    private LocalDateTime deadLine;

    private LocalDateTime createdAt;
}
