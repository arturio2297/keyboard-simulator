package com.backend.service.account;

import com.backend.configuration.storage.ObjectStorageConfiguration;
import com.backend.core.message.account.UpdateAccountRequest;
import com.backend.data.model.user.User;
import com.backend.data.respository.UserRepository;
import com.backend.service.image.ImageService;
import com.backend.service.image.ImageService.ResizeImageResult;
import com.backend.service.storage.ObjectStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final ImageService imageService;
    private final ObjectStorageService objectStorageService;
    private final ObjectStorageConfiguration objectStorageConfiguration;
    private final UserRepository userRepository;

    public User get() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public void updateAvatar(MultipartFile avatar) {
        final User user = get();

        final String bucket = objectStorageConfiguration.getBucket().getAvatar();
        final String avatarObjectName;

        final ResizeImageResult result = imageService.resizeAvatar(avatar);
        if (user.getAvatarObjectName() != null) {
            avatarObjectName = objectStorageService.replace(bucket, result.getIs(), result.getSize(),
                    avatar.getContentType(), user.getAvatarObjectName());
        } else {
            avatarObjectName = objectStorageService.add(bucket, result.getIs(), result.getSize(),
                    avatar.getContentType());
        }

        user.setAvatarObjectName(avatarObjectName);

        userRepository.save(user);
    }

    public User update(UpdateAccountRequest request) {
        final User user = get();

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());

        return userRepository.save(user);
    }
}
